
import TheSelectSearch from 'components/UI/TheSelectSearch';
import {
  SORT_BY_OPTIONS,
  YEAR_OPTIONS,
  RATING_OPTIONS,
  WATCH_PROVIDER_OPTIONS
} from 'utils/constants/select-search';

const DiscoverFilters = ({
  sortValue,
  onSortChange,
  yearValue = '',
  onYearChange,
  ratingValue = '',
  onRatingChange,
  providerValue = '',
  onProviderChange,
  sortOptions = SORT_BY_OPTIONS
}) => (
  <div className='discover-filters'>
    <TheSelectSearch
      id='sort-by'
      label='Sort by'
      options={sortOptions}
      value={sortValue}
      onChange={onSortChange} />
    {onYearChange && (
      <TheSelectSearch
        id='year'
        label='Year'
        options={YEAR_OPTIONS}
        value={yearValue}
        onChange={onYearChange} />
    )}
    {onRatingChange && (
      <TheSelectSearch
        id='rating'
        label='Min rating'
        options={RATING_OPTIONS}
        value={ratingValue}
        onChange={onRatingChange} />
    )}
    {onProviderChange && (
      <TheSelectSearch
        id='provider'
        label='Watch provider'
        options={WATCH_PROVIDER_OPTIONS}
        value={providerValue}
        onChange={onProviderChange} />
    )}
    <style jsx>{`
      .discover-filters {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
        gap: 1.6rem 2rem;
        margin: 1.6rem 0 0;
      }
    `}</style>
  </div>
);

export default DiscoverFilters;
