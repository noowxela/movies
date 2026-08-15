import { redirectTo } from 'utils/hooks/useQueryRouter';

import * as TYPES from './types';
import tmdbAPI from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';
import { isAbortError } from 'utils/helpers/getErrorMessage';

const getGenreMovies = (genreId, page, sort, filters = {}, signal) => async (
  dispatch,
  getState
) => {
  const { selectedMenuItemName } = getState().general;
  if (!selectedMenuItemName) {
    return;
  }
  try {
    dispatch({type: TYPES.SET_MOVIES_LOADING});
    const params = {
      with_genres: genreId,
      page,
      sort_by: sort
    };

    if (filters.year) {
      params.primary_release_year = filters.year;
    }

    if (filters.rating) {
      params['vote_average.gte'] = filters.rating;
    }

    if (filters.provider) {
      params.with_watch_providers = filters.provider;
      params.watch_region = filters.watchRegion || 'US';
      params.with_watch_monetization_types = 'flatrate|free|ads|rent|buy';
    }

    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/discover/movie`, {
      params,
      signal
    });
    await dispatch({
      type: TYPES.FETCH_GENRE_MOVIES,
      payload: response.data
    });
    dispatch({type: TYPES.UNSET_MOVIES_LOADING});
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }
    console.log('[getGenreMovies] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response || error});
    redirectTo(LINKS.ERROR.HREF);
  }
};

export default getGenreMovies;
