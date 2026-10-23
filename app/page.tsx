import CatalogView from 'components/CatalogView';
import MenuSelectionSync from 'components/MenuSelectionSync';
import STATIC_MOVIE_CATEGORIES from 'utils/constants/static-movie-categories';
import QUERY_PARAMS from 'utils/constants/query-params';
import { tmdbFetch, type TmdbListResponse, type TmdbMovieListItem } from 'lib/tmdb';
import { readParam, type SearchParams } from 'lib/search-params';

export const revalidate = 3600;

const HomePage = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const query = await searchParams;
  const categoryName = readParam(query, QUERY_PARAMS.CATEGORY) || STATIC_MOVIE_CATEGORIES[0].name;
  const page = Number(readParam(query, QUERY_PARAMS.PAGE) || 1);
  const category = STATIC_MOVIE_CATEGORIES.find(item => item.name === categoryName) || STATIC_MOVIE_CATEGORIES[0];
  const movies = await tmdbFetch<TmdbListResponse<TmdbMovieListItem>>(
    `/3/movie/${category.id}`,
    { page }
  );

  return (
    <>
      <MenuSelectionSync name={category.name} />
      <CatalogView
        title={category.name}
        subtitle='movies'
        movies={movies} />
    </>
  );
};

export default HomePage;
