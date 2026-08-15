
import { redirectTo } from 'utils/hooks/useQueryRouter';

import * as TYPES from './types';
import tmdbAPI from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';

const getRecommendedTV = (id, page) => async dispatch => {
  try {
    dispatch({type: TYPES.SET_RECOMMENDED_MOVIES_LOADING});
    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/tv/${id}/recommendations`, {
      params: {page}
    });
    dispatch({
      type: TYPES.FETCH_RECOMMENDED_MOVIES,
      payload: {
        ...response.data,
        results: (response.data.results || []).map(item => ({
          ...item,
          media_type: 'tv'
        }))
      }
    });
    dispatch({type: TYPES.UNSET_RECOMMENDED_MOVIES_LOADING});
  } catch (error) {
    console.log('[getRecommendedTV] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response || error});
    redirectTo(LINKS.ERROR.HREF);
  }
};

export default getRecommendedTV;
