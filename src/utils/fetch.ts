import { RequestInit, Response } from 'node-fetch';

type Fetch = (url: string, init?: RequestInit) => Promise<Response>;

/* istanbul ignore next */
export const fetch: Fetch = !(globalThis as any).fetch
  ? (url, init) => import('node-fetch').then(({ default: f }) => f(url, init))
  : (globalThis as any).fetch;
