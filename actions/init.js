

import * as TYPES from './types';
import getConfig from './getConfig';
import getGenres from './getGenres';
import getTVGenres from './getTVGenres';

const init = () => async dispatch => {
  dispatch({type: TYPES.SET_LOADING});
  await Promise.all([
    dispatch(getConfig()),
    dispatch(getGenres()),
    dispatch(getTVGenres())
  ]);
  dispatch({type: TYPES.UNSET_LOADING});
};

export default init;
