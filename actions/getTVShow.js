
import { redirectTo } from 'utils/hooks/useQueryRouter';

import * as TYPES from './types';
import tmdbAPI from 'services/tmdbAPI';
import LINKS from 'utils/constants/links';
import { TMDB_API_VERSION } from 'config/tmdb';

const normalizeTVShow = tv => ({
  ...tv,
  media_type: 'tv',
  title: tv.name,
  release_date: tv.first_air_date,
  runtime: Array.isArray(tv.episode_run_time) ? tv.episode_run_time[0] : tv.episode_run_time,
  imdb_id: tv.external_ids?.imdb_id,
  cast: tv.aggregate_credits?.cast || tv.credits?.cast || [],
  videos: tv.videos || {results: []}
});

const getTVShow = id => async dispatch => {
  try {
    dispatch({type: TYPES.SET_MOVIE_LOADING});
    const response = await tmdbAPI.get(`/${TMDB_API_VERSION}/tv/${id}`, {
      params: {
        append_to_response: 'videos,watch/providers,aggregate_credits,external_ids'
      }
    });
    await dispatch({
      type: TYPES.FETCH_MOVIE,
      payload: normalizeTVShow(response.data)
    });
    dispatch({type: TYPES.UNSET_MOVIE_LOADING});
  } catch (error) {
    console.log('[getTVShow] error => ', error);
    dispatch({type: TYPES.INSERT_ERROR, payload: error.response || error});
    redirectTo(LINKS.ERROR.HREF);
  }
};

export default getTVShow;
