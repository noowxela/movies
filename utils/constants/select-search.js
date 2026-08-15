
const LIST_VISIBILITY = Object.freeze({
  PUBLIC: 'public',
  PRIVATE: 'private'
});

const YES_OR_NO_OPTIONS = [
  {value: LIST_VISIBILITY.PUBLIC, name: 'Yes'},
  {value: LIST_VISIBILITY.PRIVATE, name: 'No'}
];

const SORT_BY_OPTIONS = [
  {value: 'popularity.desc', name: 'Popularity'},
  {value: 'vote_average.desc', name: 'Votes Average'},
  {value: 'original_title.asc', name: 'Original Title'},
  {value: 'release_date.desc', name: 'Release Date'}
];

const TV_SORT_BY_OPTIONS = [
  {value: 'popularity.desc', name: 'Popularity'},
  {value: 'vote_average.desc', name: 'Votes Average'},
  {value: 'original_name.asc', name: 'Original Name'},
  {value: 'first_air_date.desc', name: 'First Air Date'}
];

const currentYear = new Date().getFullYear();

const YEAR_OPTIONS = [
  {value: '', name: 'Any year'},
  ...Array.from({length: currentYear - 1949}, (_, index) => {
    const year = String(currentYear - index);
    return {value: year, name: year};
  })
];

const RATING_OPTIONS = [
  {value: '', name: 'Any rating'},
  {value: '5', name: '5+'},
  {value: '6', name: '6+'},
  {value: '7', name: '7+'},
  {value: '8', name: '8+'}
];

const WATCH_PROVIDER_OPTIONS = [
  {value: '', name: 'Any provider'},
  {value: '8', name: 'Netflix'},
  {value: '9', name: 'Prime Video'},
  {value: '337', name: 'Disney+'},
  {value: '350', name: 'Apple TV+'},
  {value: '1899', name: 'Max'},
  {value: '15', name: 'Hulu'}
];

export {
  LIST_VISIBILITY,
  YES_OR_NO_OPTIONS,
  SORT_BY_OPTIONS,
  TV_SORT_BY_OPTIONS,
  YEAR_OPTIONS,
  RATING_OPTIONS,
  WATCH_PROVIDER_OPTIONS
};
