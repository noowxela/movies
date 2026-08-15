import * as TYPES from './types';
import tmdbAPI from 'services/tmdbAPI';
import { TMDB_API_VERSION } from 'config/tmdb';

const getTVGenres = () => async dispatch => {
  try {
    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/genre/tv/list`);
    dispatch({
      type: TYPES.FETCH_TV_GENRES,
      payload: response.data
    });
  } catch (error) {
    console.log('[getTVGenres] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response || error});
  }
};

export default getTVGenres;
