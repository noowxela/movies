import PersonDetailView from 'components/PersonDetailView';
import QUERY_PARAMS from 'utils/constants/query-params';
import { SORT_BY_OPTIONS } from 'utils/constants/select-search';
import { tmdbFetch, type TmdbListResponse, type TmdbMovieListItem } from 'lib/tmdb';
import { readParam, type SearchParams } from 'lib/search-params';

export const revalidate = 3600;

const PersonPage = async ({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) => {
  const query = await searchParams;
  const personId = readParam(query, QUERY_PARAMS.ID);
  const page = Number(readParam(query, QUERY_PARAMS.PAGE) || 1);
  const sort = readParam(query, QUERY_PARAMS.SORT) || SORT_BY_OPTIONS[0].value;

  const [person, personMovies] = await Promise.all([
    tmdbFetch<Record<string, any>>(`/3/person/${personId}`),
    tmdbFetch<TmdbListResponse<TmdbMovieListItem>>('/3/discover/movie', {
      with_cast: personId,
      page,
      sort_by: sort
    })
  ]);

  return (
    <PersonDetailView
      person={person}
      personMovies={personMovies} />
  );
};

export default PersonPage;
