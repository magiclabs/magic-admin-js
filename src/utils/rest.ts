import fetch from 'node-fetch';

/**
 * HTTP POST to Magic's API.
 */
export function post<T extends Record<string, string | number | boolean> = {}>(
  url: string,
  secretApiKey: string,
  body: T,
) {
  return fetch(url, {
    method: 'POST',
    headers: { 'X-Magic-Secret-key': secretApiKey },
    body: JSON.stringify(body),
  });
}

/**
 * HTTP GET from Magic's API.
 */
export function get<T extends Record<string, string | number | boolean> = {}>(
  url: string,
  secretApiKey: string,
  params?: T,
) {
  let query = '?';
  if (params) {
    for (const [key, value] of Object.entries(params)) query += `${key}=${value}&`;
    query = query.slice(0, -1); // Remove trailing "&"
  }
  const urlWithParams = params ? `${url}${query}` : url;

  return fetch(urlWithParams, {
    method: 'GET',
    headers: { 'X-Magic-Secret-key': secretApiKey },
  });
}
