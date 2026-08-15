'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import DiscoverFilters from 'components/DiscoverFilters';
import {
  SORT_BY_OPTIONS,
  TV_SORT_BY_OPTIONS
} from 'utils/constants/select-search';
import QUERY_PARAMS from 'utils/constants/query-params';

const DiscoverControls = ({
  mediaType = 'movie'
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set(QUERY_PARAMS.PAGE, '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <DiscoverFilters
      sortOptions={mediaType === 'tv' ? TV_SORT_BY_OPTIONS : SORT_BY_OPTIONS}
      sortValue={searchParams.get(QUERY_PARAMS.SORT) || (mediaType === 'tv' ? TV_SORT_BY_OPTIONS[0].value : SORT_BY_OPTIONS[0].value)}
      onSortChange={value => updateParam(QUERY_PARAMS.SORT, value)}
      yearValue={searchParams.get(QUERY_PARAMS.YEAR) || ''}
      onYearChange={value => updateParam(QUERY_PARAMS.YEAR, value)}
      ratingValue={searchParams.get(QUERY_PARAMS.RATING) || ''}
      onRatingChange={value => updateParam(QUERY_PARAMS.RATING, value)}
      providerValue={searchParams.get(QUERY_PARAMS.PROVIDER) || ''}
      onProviderChange={value => updateParam(QUERY_PARAMS.PROVIDER, value)} />
  );
};

export default DiscoverControls;
