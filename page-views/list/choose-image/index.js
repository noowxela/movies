'use client';


import {
  useState,
  useEffect,
  useCallback
} from 'react';
import useQueryRouter from 'utils/hooks/useQueryRouter';
import PageTitle from 'components/PageTitle';
import { animateScroll as scroll } from 'react-scroll';

import Header from 'parts/Header';
import NotFound from 'parts/NotFound';
import PageWrapper from 'parts/PageWrapper';
import PaddingWrapper from 'parts/PaddingWrapper';
import ChooseImageItem from 'parts/ChooseImageItem';
import ListNavigation from 'containers/ListNavigation';
import BackdropsGridContainer from 'components/BackdropsGridContainer';
import Pagination from 'components/Pagination';
import Loader from 'components/UI/Loader';
import withTheme from 'utils/hocs/withTheme';
import withAuth from 'utils/hocs/withAuth';
import QUERY_PARAMS from 'utils/constants/query-params';
import STATUSES from 'utils/constants/statuses';
import { TMDB_API_NEW_VERSION, TMDB_IMAGE_BASE_URL } from 'config/tmdb';
import tmdbAPI from 'services/tmdbAPI';
import getErrorMessage from 'utils/helpers/getErrorMessage';

const BACKDROP_STATUSES = {
  SELECTED: 'SELECTED',
  SELECTING: 'SELECTING',
  SELECT: 'SELECT'
};

const ChooseImage = ({
  theme,
  accountId,
  accessToken
}) => {
  const { query, asPath, push, replace } = useQueryRouter();

  const [status, setStatus] = useState(STATUSES.IDLE);
  const [chooseImageStatus, setChooseImageStatus] = useState(STATUSES.IDLE);
  // TODO: could handle errors
  const [error, setError] = useState(null);
  const [chooseImageError, setChooseImageError] = useState(null);

  const [movies, setMovies] = useState(null);

  const page = Number(query[QUERY_PARAMS.PAGE]);
  const listId = query[QUERY_PARAMS.LIST_ID];

  useEffect(() => {
    (async () => {
      if (!page) return;
      if (!listId) return;
      if (!accessToken) return;
      if (!accountId) return;

      scroll.scrollToTop({smooth: true});

      try {
        setStatus(STATUSES.PENDING);
        const response = await tmdbAPI.get(`/${TMDB_API_NEW_VERSION}/list/${listId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            page
          }
        });
        const movies = response.data;
        if (movies.created_by.id === accountId) {
          setMovies(movies);
        } else {
          throw new Error('You don\'t seem to have access to this page.');
        }
      } catch (error) {
        setStatus(STATUSES.REJECTED);
        setError(error);
      }
    })();
  }, [page, listId, accessToken, accountId]);

  useEffect(() => {
    if (!movies) return;

    setStatus(STATUSES.RESOLVED);
  }, [movies]);

  const chooseImageHandler = useCallback(backdropPath => async () => {
    try {
      setChooseImageStatus(STATUSES.PENDING);

      const body = {
        backdrop_path: backdropPath
      };
      const config = {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      };
      await tmdbAPI.put(`/${TMDB_API_NEW_VERSION}/list/${listId}`, body, config);

      setChooseImageStatus(STATUSES.RESOLVED);

      setMovies(prevState => {
        const nextState = {
          ...prevState,
          backdrop_path: backdropPath
        };

        return nextState;
      });
    } catch (error) {
      setChooseImageStatus(STATUSES.REJECTED);
      setChooseImageError(getErrorMessage(error, 'We could not update the list image.'));
    }
  }, [accessToken, listId]);

  if (status === STATUSES.IDLE || status === STATUSES.PENDING) {
    return <Loader />;
  }

  if (status === STATUSES.REJECTED) {
    return (
      <NotFound
        title='Unable to choose a list image'
        subtitle={getErrorMessage(error, 'You do not have permission to change this list, or it could not be found.')} />
    );
  }

  if (status === STATUSES.RESOLVED) {
    return (
      <>
        <PageTitle>{movies.name}</PageTitle>
        <PageWrapper>
          <PaddingWrapper>
            <Header
              title={movies.name || 'No name'}
              subtitle={movies.description || 'No description'} />
            <ListNavigation listId={listId} />
              {chooseImageError && (
                <p style={{color: 'var(--palette-error-main, #f44336)', fontSize: '1.5rem'}}>
                  {chooseImageError}
                </p>
              )}
              {movies.total_results === 0 ? (
                <NotFound
                  title='Sorry!'
                  subtitle='There are no items added to this list....' />
              ) : (
                <>
                  <BackdropsGridContainer theme={theme}>
                    {movies.results.map(movie => {
                      let backdropStatus;
                      if (chooseImageStatus === STATUSES.PENDING) {
                        backdropStatus = BACKDROP_STATUSES.SELECTING;
                      } else {
                        backdropStatus = BACKDROP_STATUSES.SELECT;
                      }
                      if (movies.backdrop_path === movie.backdrop_path) {
                        backdropStatus = BACKDROP_STATUSES.SELECTED;
                      }

                      const disabled = backdropStatus === BACKDROP_STATUSES.SELECTING || backdropStatus === BACKDROP_STATUSES.SELECTED;
                      const textAlwaysVisible = backdropStatus === BACKDROP_STATUSES.SELECTED;

                      return (
                        <ChooseImageItem
                          theme={theme}
                          key={movie.id}
                          movie={movie}
                          text={backdropStatus}
                          textAlwaysVisible={textAlwaysVisible}
                          disabled={disabled}
                          onClick={chooseImageHandler(movie.backdrop_path)}
                          baseUrl={TMDB_IMAGE_BASE_URL} />
                      );
                    })}
                  </BackdropsGridContainer>
                  <Pagination
                    page={movies.page}
                    totalPages={movies.total_pages} />
                </>
              )}
          </PaddingWrapper>
        </PageWrapper>
      </>
    );
  }
};

export default withAuth(withTheme(ChooseImage));
