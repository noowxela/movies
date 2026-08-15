

import { redirectTo } from 'utils/hooks/useQueryRouter';

import * as TYPES from './types';
import { alternativeTmdbAPI as tmdbAPI } from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';
import { isAbortError } from 'utils/helpers/getErrorMessage';

// Get Popular, Top Rated, and Upcoming movies
const getStaticCategoryMovies = (name, page, signal) => async (dispatch, getState) => {
  const { selectedMenuItemName, staticCategories } = getState().general;
  if (!selectedMenuItemName) {
    return;
  }
  try {
    dispatch({type: TYPES.SET_MOVIES_LOADING});
    const staticCategoryId = staticCategories
      .filter(element => element.name === name)
      .map(element => element.id)
      .join('');
    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/movie/${staticCategoryId}`, {
      params: {page},
      signal
    });
    await dispatch({
      type: TYPES.FETCH_STATIC_CATEGORY_MOVIES,
      payload: response.data
    });
    dispatch({type: TYPES.UNSET_MOVIES_LOADING});
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }
    console.log('[getStaticCategoryMovies] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response || error});
    redirectTo(LINKS.ERROR.HREF);
  }
};

export default getStaticCategoryMovies;
