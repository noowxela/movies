import CatalogView from 'components/CatalogView';
import MenuSelectionSync from 'components/MenuSelectionSync';
import STATIC_TV_CATEGORIES from 'utils/constants/static-tv-categories';
import QUERY_PARAMS from 'utils/constants/query-params';
import { tmdbFetch, type TmdbListResponse, type TmdbMovieListItem } from 'lib/tmdb';
import { readParam, type SearchParams } from 'lib/search-params';

export const revalidate = 3600;

const TVHomePage = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const query = await searchParams;
  const categoryName = readParam(query, QUERY_PARAMS.CATEGORY) || STATIC_TV_CATEGORIES[0].name;
  const page = Number(readParam(query, QUERY_PARAMS.PAGE) || 1);
  const category = STATIC_TV_CATEGORIES.find(item => item.name === categoryName) || STATIC_TV_CATEGORIES[0];
  const shows = await tmdbFetch<TmdbListResponse<TmdbMovieListItem>>(
    `/3/tv/${category.id}`,
    { page }
  );

  return (
    <>
      <MenuSelectionSync name={category.name} />
      <CatalogView
        title={category.name}
        subtitle='tv shows'
        movies={{
          ...shows,
          results: (shows.results || []).map(item => ({...item, media_type: 'tv'}))
        }} />
    </>
  );
};

export default TVHomePage;
