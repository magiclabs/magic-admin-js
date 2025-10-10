import { RequestInit } from 'node-fetch';

import { fetch } from './fetch';
import { createServiceError } from '../core/sdk-exceptions';

/**
 * Performs a `fetch` to the given URL with the configured `init` object.
 */
async function emitRequest<TResponse>(url: string, init?: RequestInit): Promise<Partial<TResponse>> {
  const response = await fetch(url, init)
    .then((res) => res.json())
    .catch((err) => {
      throw createServiceError(err);
    });

  return response;
}

/**
 * Generates an encoded URL with query string from a dictionary of values.
 */
function generateQuery<T extends Record<string, string | number | boolean>>(url: string, params?: T) {
  let query = '?';
  if (params) {
    for (const [key, value] of Object.entries(params)) query += `${key}=${value}&`;
    query = query.slice(0, -1); // Remove trailing "&"
  }
  return params ? `${url}${query}` : url;
}

/**
 * POSTs to Magic's API.
 */
export function post<TBody extends Record<string, string | number | boolean>, TResponse>(
  url: string,
  secretApiKey: string,
  body: TBody,
) {
  return emitRequest<TResponse>(url, {
    method: 'POST',
    headers: { 'X-Magic-Secret-Key': secretApiKey },
    body: JSON.stringify(body),
  });
}

/**
 * GETs from Magic's API.
 */
export function get<TResponse>(url: string, secretApiKey: string, params?: any) {
  const urlWithParams = generateQuery(url, params);
  return emitRequest<TResponse>(urlWithParams, {
    method: 'GET',
    headers: { 'X-Magic-Secret-Key': secretApiKey },
  });
}
