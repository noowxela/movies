
const STORAGE_KEY = 'zaps.movies.dev';
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:8080').replace(/\/$/, '');

export {
  STORAGE_KEY,
  SITE_URL
};
