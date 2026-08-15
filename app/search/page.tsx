import CatalogView from 'components/CatalogView';
import NotFound from 'parts/NotFound';
import QUERY_PARAMS from 'utils/constants/query-params';
import { tmdbFetch, type TmdbListResponse, type TmdbMovieListItem } from 'lib/tmdb';
import { readParam, type SearchParams } from 'lib/search-params';

export const revalidate = 60;

const SearchPage = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const query = await searchParams;
  const searchTerm = readParam(query, QUERY_PARAMS.SEARCH_TERM) || '';
  const page = Number(readParam(query, QUERY_PARAMS.PAGE) || 1);

  if (!searchTerm) {
    return (
      <NotFound
        title='Search'
        subtitle='Enter a title to search movies and TV shows.' />
    );
  }

  const results = await tmdbFetch<TmdbListResponse<TmdbMovieListItem>>('/3/search/multi', {
    query: searchTerm,
    page
  });
  const movies = {
    ...results,
    results: (results.results || []).filter(result => (
      result.media_type === 'movie' || result.media_type === 'tv'
    ))
  };

  if (!movies.results.length) {
    return (
      <NotFound
        title='Sorry!'
        subtitle={`There were no results for ${searchTerm}...`} />
    );
  }

  return (
    <CatalogView
      title={searchTerm}
      subtitle='search results'
      movies={movies} />
  );
};

export default SearchPage;
