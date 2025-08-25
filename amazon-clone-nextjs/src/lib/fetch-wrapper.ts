// lib/fetch-wrapper.ts
export async function fetcher(url: string, options?: RequestInit) {
  const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const isServer = typeof window === 'undefined';
  const finalURL = isServer ? `${baseURL}${url}` : url;
  
  return fetch(finalURL, options);
}