import MediaDetailView from 'components/MediaDetailView';
import QUERY_PARAMS from 'utils/constants/query-params';
import { tmdbFetch, type TmdbListResponse, type TmdbMovieListItem } from 'lib/tmdb';
import { readParam, type SearchParams } from 'lib/search-params';

export const revalidate = 3600;

const normalizeTVShow = (tv: Record<string, any>) => ({
  ...tv,
  media_type: 'tv',
  title: tv.name,
  release_date: tv.first_air_date,
  runtime: Array.isArray(tv.episode_run_time) ? tv.episode_run_time[0] : tv.episode_run_time,
  imdb_id: tv.external_ids?.imdb_id,
  cast: tv.aggregate_credits?.cast || tv.credits?.cast || [],
  videos: tv.videos || {results: []}
});

const TVShowPage = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const query = await searchParams;
  const showId = readParam(query, QUERY_PARAMS.ID);
  const page = Number(readParam(query, QUERY_PARAMS.PAGE) || 1);

  const [show, recommended] = await Promise.all([
    tmdbFetch<Record<string, any>>(`/3/tv/${showId}`, {
      append_to_response: 'videos,watch/providers,aggregate_credits,external_ids'
    }),
    tmdbFetch<TmdbListResponse<TmdbMovieListItem>>(`/3/tv/${showId}/recommendations`, { page })
  ]);

  return (
    <MediaDetailView
      movie={normalizeTVShow(show)}
      recommendedMovies={{
        ...recommended,
        loading: false,
        results: (recommended.results || []).map(item => ({...item, media_type: 'tv'}))
      }} />
  );
};

export default TVShowPage;
