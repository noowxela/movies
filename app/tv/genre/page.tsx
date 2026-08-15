import CatalogView from 'components/CatalogView';
import DiscoverControls from 'components/DiscoverControls';
import MenuSelectionSync from 'components/MenuSelectionSync';
import QUERY_PARAMS from 'utils/constants/query-params';
import { TV_SORT_BY_OPTIONS } from 'utils/constants/select-search';
import { tmdbFetch, type TmdbListResponse, type TmdbMovieListItem } from 'lib/tmdb';
import { readParam, type SearchParams } from 'lib/search-params';

export const revalidate = 3600;

const TVGenrePage = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const query = await searchParams;
  const genreId = readParam(query, QUERY_PARAMS.ID);
  const genreName = readParam(query, QUERY_PARAMS.NAME) || 'Genre';
  const page = Number(readParam(query, QUERY_PARAMS.PAGE) || 1);
  const sort = readParam(query, QUERY_PARAMS.SORT) || TV_SORT_BY_OPTIONS[0].value;
  const year = readParam(query, QUERY_PARAMS.YEAR);
  const rating = readParam(query, QUERY_PARAMS.RATING);
  const provider = readParam(query, QUERY_PARAMS.PROVIDER);

  const shows = await tmdbFetch<TmdbListResponse<TmdbMovieListItem>>('/3/discover/tv', {
    with_genres: genreId,
    page,
    sort_by: sort,
    first_air_date_year: year,
    'vote_average.gte': rating,
    with_watch_providers: provider,
    watch_region: provider ? 'US' : undefined,
    with_watch_monetization_types: provider ? 'flatrate|free|ads|rent|buy' : undefined
  });

  return (
    <>
      <MenuSelectionSync name={genreName} />
      <CatalogView
        title={genreName}
        subtitle='tv shows'
        movies={{
          ...shows,
          results: (shows.results || []).map(item => ({...item, media_type: 'tv'}))
        }}
        filters={<DiscoverControls mediaType='tv' />} />
    </>
  );
};

export default TVGenrePage;
