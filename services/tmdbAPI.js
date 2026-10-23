
import axios from 'redaxios';

import {
  TMDB_API_KEY,
  TMDB_API_BASE_URL,
  TMDB_API_READ_ACCESS_TOKEN
} from 'config/tmdb';

const resolveUrl = path => {
  const clean = String(path || '').replace(/^\//, '');
  if (typeof window !== 'undefined') {
    return `/api/tmdb/${clean}`;
  }
  return `${TMDB_API_BASE_URL}/${clean}`;
};

const withClientConfig = (config = {}) => {
  const isBrowser = typeof window !== 'undefined';
  return {
    ...config,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      ...(isBrowser || !TMDB_API_READ_ACCESS_TOKEN ? {} : {
        Authorization: `Bearer ${TMDB_API_READ_ACCESS_TOKEN}`
      }),
      ...(config.headers || {})
    },
    params: {
      ...(isBrowser || !TMDB_API_KEY ? {} : { api_key: TMDB_API_KEY }),
      ...(config.params || {})
    }
  };
};

const tmdbAPI = {
  get: (url, config) => axios.get(resolveUrl(url), withClientConfig(config)),
  post: (url, body, config) => axios.post(resolveUrl(url), body, withClientConfig(config)),
  put: (url, body, config) => axios.put(resolveUrl(url), body, withClientConfig(config)),
  delete: (url, config) => axios.delete(resolveUrl(url), withClientConfig(config))
};

const alternativeTmdbAPI = tmdbAPI;

export {
  alternativeTmdbAPI
};

export default tmdbAPI;
