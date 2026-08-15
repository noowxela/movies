'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import PageWrapper from 'parts/PageWrapper';
import PersonSummary from 'components/PersonSummary';
import PersonMovieList from 'components/PersonMovieList';
import QUERY_PARAMS from 'utils/constants/query-params';
import { SORT_BY_OPTIONS } from 'utils/constants/select-search';
import { TMDB_IMAGE_BASE_URL } from 'config/tmdb';

const PersonDetailView = ({
  person,
  personMovies,
  baseUrl = TMDB_IMAGE_BASE_URL
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sortByOptionValue = searchParams.get(QUERY_PARAMS.SORT) || SORT_BY_OPTIONS[0].value;

  const onSortChange = value => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(QUERY_PARAMS.SORT, value);
    params.set(QUERY_PARAMS.PAGE, '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <PageWrapper>
      <PersonSummary
        baseUrl={baseUrl}
        person={person} />
      <PersonMovieList
        baseUrl={baseUrl}
        personMovies={{...personMovies, loading: false}}
        sortByOptionValue={sortByOptionValue}
        sortByOptionValueOnChange={onSortChange} />
    </PageWrapper>
  );
};

export default PersonDetailView;
