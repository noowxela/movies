import MediaDetailView from 'components/MediaDetailView';
import QUERY_PARAMS from 'utils/constants/query-params';
import { tmdbFetch, type TmdbListResponse, type TmdbMovieListItem } from 'lib/tmdb';
import { readParam, type SearchParams } from 'lib/search-params';

export const revalidate = 3600;

const MoviePage = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const query = await searchParams;
  const movieId = readParam(query, QUERY_PARAMS.ID);
  const page = Number(readParam(query, QUERY_PARAMS.PAGE) || 1);

  const [movie, credits, recommendedMovies] = await Promise.all([
    tmdbFetch<Record<string, any>>(`/3/movie/${movieId}`, {
      append_to_response: 'videos,watch/providers'
    }),
    tmdbFetch<{ cast: any[] }>(`/3/movie/${movieId}/credits`),
    tmdbFetch<TmdbListResponse<TmdbMovieListItem>>(`/3/movie/${movieId}/recommendations`, { page })
  ]);

  return (
    <MediaDetailView
      movie={{
        ...movie,
        media_type: 'movie',
        cast: credits.cast || []
      }}
      recommendedMovies={{
        ...recommendedMovies,
        loading: false
      }} />
  );
};

export default MoviePage;
