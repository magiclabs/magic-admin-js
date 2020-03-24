import fetch, { RequestInit } from 'node-fetch';
import { createServiceError } from '../core/sdk-exceptions';

interface MagicAPIResponse<TData = {}> {
  data?: TData;
  error_code?: string;
  message?: string;
  status?: string | number;
}

/**
 * Performs a `fetch` to the given URL with the configured `init` object.
 */
async function emitRequest<TResponse extends any = {}>(url: string, init?: RequestInit): Promise<Partial<TResponse>> {
  const json: MagicAPIResponse<TResponse> = await fetch(url, init)
    .then(res => res.json())
    .catch(err => {
      throw createServiceError(err);
    });

  if (json.status !== 'ok') {
    throw createServiceError(json);
  }

  return json.data ?? {};
}

/**
 * Generates an encoded URL with query string from a dictionary of values.
 */
function generateQuery<T extends Record<string, string | number | boolean> = {}>(url: string, params?: T) {
  let query = '?';
  if (params) {
    for (const [key, value] of Object.entries(params)) query += `${key}=${encodeURIComponent(value)}&`;
    query = query.slice(0, -1); // Remove trailing "&"
  }
  return params ? `${url}${query}` : url;
}

/**
 * POSTs to Magic's API.
 */
export function post<TBody extends Record<string, string | number | boolean> = {}, TResponse extends any = {}>(
  url: string,
  secretApiKey: string,
  body: TBody,
) {
  return emitRequest<TResponse>(url, {
    method: 'POST',
    headers: { 'X-Magic-Secret-key': secretApiKey },
    body: JSON.stringify(body),
  });
}

/**
 * GETs from Magic's API.
 */
export function get<TResponse extends any = {}>(url: string, secretApiKey: string, params?: any) {
  const urlWithParams = generateQuery(url, params);
  return emitRequest<TResponse>(urlWithParams, {
    method: 'GET',
    headers: { 'X-Magic-Secret-key': secretApiKey },
  });
}
