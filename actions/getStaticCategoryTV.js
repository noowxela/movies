
import { redirectTo } from 'utils/hooks/useQueryRouter';

import * as TYPES from './types';
import tmdbAPI from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';
import { isAbortError } from 'utils/helpers/getErrorMessage';

const getStaticCategoryTV = (name, page, signal) => async (dispatch, getState) => {
  const { selectedMenuItemName, staticTVCategories } = getState().general;
  if (!selectedMenuItemName) {
    return;
  }
  try {
    dispatch({type: TYPES.SET_MOVIES_LOADING});
    const staticCategoryId = staticTVCategories
      .filter(element => element.name === name)
      .map(element => element.id)
      .join('');
    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/tv/${staticCategoryId}`, {
      params: {page},
      signal
    });
    await dispatch({
      type: TYPES.FETCH_STATIC_CATEGORY_MOVIES,
      payload: {
        ...response.data,
        results: (response.data.results || []).map(item => ({
          ...item,
          media_type: 'tv'
        }))
      }
    });
    dispatch({type: TYPES.UNSET_MOVIES_LOADING});
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }
    console.log('[getStaticCategoryTV] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response || error});
    redirectTo(LINKS.ERROR.HREF);
  }
};

export default getStaticCategoryTV;
