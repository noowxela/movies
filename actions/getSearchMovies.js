

import { redirectTo } from 'utils/hooks/useQueryRouter';

import * as TYPES from './types';
import tmdbAPI from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';
import { isAbortError } from 'utils/helpers/getErrorMessage';

const getSearchMovies = (query, page, signal) => async dispatch => {
  try {
    dispatch({type: TYPES.SET_MOVIES_LOADING});
    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/search/multi`, {
      params: {
        query,
        page
      },
      signal
    });
    const payload = {
      ...response.data,
      results: (response.data.results || []).filter(result => (
        result.media_type === 'movie' || result.media_type === 'tv'
      ))
    };
    await dispatch({
      type: TYPES.FETCH_SEARCH_MOVIES,
      payload
    });
    dispatch({type: TYPES.UNSET_MOVIES_LOADING});
  } catch (error) {
    if (isAbortError(error)) {
      return;
    }
    console.log('[getSearchMovies] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response || error});
    redirectTo(LINKS.ERROR.HREF);
  }
};

export default getSearchMovies;
