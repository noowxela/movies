
import { useEffect, useState } from 'react';

import TextButton from 'components/UI/TextButton';
import { useAuth } from 'utils/hocs/AuthProvider';
import {
  getAccountStates,
  setFavorite,
  setWatchlist
} from 'services/account';
import getErrorMessage from 'utils/helpers/getErrorMessage';

const AccountMediaActions = ({
  mediaType = 'movie',
  mediaId
}) => {
  const {
    isAuthenticated,
    login,
    isPending,
    accountId,
    accessToken,
    sessionId
  } = useAuth();
  const [favorite, setFavoriteState] = useState(false);
  const [watchlist, setWatchlistState] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!isAuthenticated || !mediaId) return;

      try {
        const states = await getAccountStates({
          mediaType,
          mediaId,
          accessToken,
          sessionId
        });
        if (cancelled) return;
        setFavoriteState(Boolean(states.favorite));
        setWatchlistState(Boolean(states.watchlist));
      } catch (error) {
        if (!cancelled) {
          setStatusMessage('');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, mediaId, mediaType, accessToken, sessionId]);

  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }

    try {
      setBusy(true);
      setStatusMessage('');
      const nextValue = !favorite;
      await setFavorite({
        accountId,
        accessToken,
        sessionId,
        mediaType,
        mediaId,
        favorite: nextValue
      });
      setFavoriteState(nextValue);
    } catch (error) {
      setStatusMessage(getErrorMessage(error, 'Could not update favorites.'));
    } finally {
      setBusy(false);
    }
  };

  const toggleWatchlist = async () => {
    if (!isAuthenticated) {
      login();
      return;
    }

    try {
      setBusy(true);
      setStatusMessage('');
      const nextValue = !watchlist;
      await setWatchlist({
        accountId,
        accessToken,
        sessionId,
        mediaType,
        mediaId,
        watchlist: nextValue
      });
      setWatchlistState(nextValue);
    } catch (error) {
      setStatusMessage(getErrorMessage(error, 'Could not update watchlist.'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className='account-media-actions'>
      <TextButton
        disabled={busy || isPending}
        onClick={toggleFavorite}>
        {isAuthenticated
          ? (favorite ? 'Remove from favorites' : 'Add to favorites')
          : 'Log in to favorite'}
      </TextButton>
      <TextButton
        disabled={busy || isPending}
        onClick={toggleWatchlist}>
        {isAuthenticated
          ? (watchlist ? 'Remove from watchlist' : 'Add to watchlist')
          : 'Log in to watchlist'}
      </TextButton>
      {statusMessage && (
        <p className='status-message'>{statusMessage}</p>
      )}
      <style jsx>{`
        .account-media-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 1.2rem;
          align-items: center;
          margin: 2.4rem 0 3.2rem;
        }

        .status-message {
          width: 100%;
          color: var(--palette-error-main, #f44336);
          font-size: 1.4rem;
          margin: 0;
        }
      `}</style>
    </div>
  );
};

export default AccountMediaActions;
