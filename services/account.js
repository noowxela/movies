
import tmdbAPI from 'services/tmdbAPI';
import { TMDB_API_VERSION, TMDB_API_NEW_VERSION } from 'config/tmdb';

const accountHeaders = accessToken => ({
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const withSession = (sessionId, params = {}) => (
  sessionId ? {...params, session_id: sessionId} : params
);

const getAccountStates = async ({
  mediaType,
  mediaId,
  accessToken,
  sessionId
}) => {
  const response = await tmdbAPI.get(
    `/${TMDB_API_VERSION}/${mediaType}/${mediaId}/account_states`,
    {
      ...accountHeaders(accessToken),
      params: withSession(sessionId)
    }
  );
  return response.data;
};

const setFavorite = async ({
  accountId,
  accessToken,
  sessionId,
  mediaType,
  mediaId,
  favorite
}) => {
  await tmdbAPI.post(
    `/${TMDB_API_VERSION}/account/${accountId}/favorite`,
    {
      media_type: mediaType,
      media_id: mediaId,
      favorite
    },
    {
      ...accountHeaders(accessToken),
      params: withSession(sessionId)
    }
  );
};

const setWatchlist = async ({
  accountId,
  accessToken,
  sessionId,
  mediaType,
  mediaId,
  watchlist
}) => {
  await tmdbAPI.post(
    `/${TMDB_API_VERSION}/account/${accountId}/watchlist`,
    {
      media_type: mediaType,
      media_id: mediaId,
      watchlist
    },
    {
      ...accountHeaders(accessToken),
      params: withSession(sessionId)
    }
  );
};

const getFavoriteMedia = async ({
  accountId,
  accessToken,
  mediaType,
  page
}) => {
  const path = mediaType === 'tv'
    ? `/${TMDB_API_NEW_VERSION}/account/${accountId}/tv/favorites`
    : `/${TMDB_API_NEW_VERSION}/account/${accountId}/movie/favorites`;
  const response = await tmdbAPI.get(path, {
    ...accountHeaders(accessToken),
    params: {page}
  });
  return response.data;
};

const getWatchlistMedia = async ({
  accountId,
  accessToken,
  mediaType,
  page
}) => {
  const path = mediaType === 'tv'
    ? `/${TMDB_API_NEW_VERSION}/account/${accountId}/tv/watchlist`
    : `/${TMDB_API_NEW_VERSION}/account/${accountId}/movie/watchlist`;
  const response = await tmdbAPI.get(path, {
    ...accountHeaders(accessToken),
    params: {page}
  });
  return response.data;
};

const convertAccessTokenToSession = async accessToken => {
  const response = await tmdbAPI.post(
    `/${TMDB_API_VERSION}/authentication/session/convert/4`,
    {access_token: accessToken}
  );
  return response.data.session_id;
};

export {
  getAccountStates,
  setFavorite,
  setWatchlist,
  getFavoriteMedia,
  getWatchlistMedia,
  convertAccessTokenToSession
};
