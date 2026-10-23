const TMDB_API_BASE_URL = 'https://api.themoviedb.org';

type SearchParams = Record<string, string | number | undefined>;

const firstEnv = (...values: Array<string | undefined>) => (
  values.find(value => typeof value === 'string' && value.trim())?.replace(/^["']|["']$/g, '') || ''
);

const getReadAccessToken = () => firstEnv(
  process.env.TMDB_API_READ_ACCESS_TOKEN,
  process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN
);

export const tmdbFetch = async <T,>(
  path: string,
  searchParams: SearchParams = {}
): Promise<T> => {
  const url = new URL(`${TMDB_API_BASE_URL}${path.startsWith('/') ? path : `/${path}`}`);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });

  if (!getReadAccessToken()) {
    throw new Error('Missing TMDB read access token');
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${getReadAccessToken()}`,
      'Content-Type': 'application/json;charset=utf-8'
    },
    next: { revalidate: 3600 }
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`TMDB request failed (${response.status}): ${body}`);
  }

  return response.json() as Promise<T>;
};

export type TmdbListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type TmdbMovieListItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string;
  vote_average?: number;
  vote_count?: number;
  media_type?: string;
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';
