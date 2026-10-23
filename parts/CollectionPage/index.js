'use client';

import { useEffect, useState } from 'react';
import Link from 'lib/legacy-link';
import useQueryRouter from 'utils/hooks/useQueryRouter';
import { animateScroll as scroll } from 'react-scroll';

import Header from 'parts/Header';
import NotFound from 'parts/NotFound';
import PageWrapper from 'parts/PageWrapper';
import PaddingWrapper from 'parts/PaddingWrapper';
import MovieList from 'components/MovieList';
import MovieListSkeleton from 'components/MovieList/MovieListSkeleton';
import Button from 'components/UI/Button';
import Annotation from 'components/Annotation';
import PageTitle from 'components/PageTitle';
import withAuth from 'utils/hocs/withAuth';
import { TMDB_IMAGE_BASE_URL } from 'config/tmdb';
import QUERY_PARAMS from 'utils/constants/query-params';
import STATUSES from 'utils/constants/statuses';
import LINKS from 'utils/constants/links';
import { TMDB_MEDIA_TYPES } from 'utils/constants/tmdb';
import getErrorMessage from 'utils/helpers/getErrorMessage';

const CollectionPage = ({
  accountId,
  accessToken,
  title,
  subtitle,
  emptyMessage,
  createLabel,
  createHref,
  fetchCollection
}) => {
  const { query } = useQueryRouter();
  const page = Number(query[QUERY_PARAMS.PAGE]) || 1;
  const [status, setStatus] = useState(STATUSES.IDLE);
  const [error, setError] = useState(null);
  const [items, setItems] = useState(null);
  const [mediaType, setMediaType] = useState(TMDB_MEDIA_TYPES.MOVIE);

  useEffect(() => {
    (async () => {
      if (!accountId || !accessToken) return;

      scroll.scrollToTop({smooth: true});

      try {
        setStatus(STATUSES.PENDING);
        const data = await fetchCollection({
          accountId,
          accessToken,
          mediaType,
          page
        });
        setItems({
          ...data,
          results: (data.results || []).map(item => ({
            ...item,
            media_type: mediaType
          }))
        });
        setStatus(STATUSES.RESOLVED);
      } catch (requestError) {
        setStatus(STATUSES.REJECTED);
        setError(requestError);
      }
    })();
  }, [page, accountId, accessToken, mediaType, fetchCollection]);

  if (status === STATUSES.REJECTED) {
    return (
      <NotFound
        title={`Unable to load ${title.toLowerCase()}`}
        subtitle={getErrorMessage(error, `We could not load your ${title.toLowerCase()}. Try logging in again.`)} />
    );
  }

  const hasItems = items?.results?.length > 0;

  return (
    <>
      <PageTitle>{title}</PageTitle>
      <PageWrapper>
        <PaddingWrapper>
          <Header
            title={title}
            subtitle={subtitle} />
          <div className='media-toggle'>
            <Button
              contained={mediaType === TMDB_MEDIA_TYPES.MOVIE}
              title='Movies'
              onClick={() => setMediaType(TMDB_MEDIA_TYPES.MOVIE)} />
            <Button
              contained={mediaType === TMDB_MEDIA_TYPES.TV}
              title='TV'
              onClick={() => setMediaType(TMDB_MEDIA_TYPES.TV)} />
          </div>
          {status === STATUSES.IDLE || status === STATUSES.PENDING ? (
            <MovieListSkeleton />
          ) : hasItems ? (
            <MovieList
              movies={items}
              baseUrl={TMDB_IMAGE_BASE_URL} />
          ) : (
            <div className='empty-state'>
              <Annotation>
                {emptyMessage}
              </Annotation>
              <Link href={createHref}>
                <Button
                  contained
                  title={createLabel} />
              </Link>
            </div>
          )}
        </PaddingWrapper>
      </PageWrapper>
      <style jsx>{`
        .media-toggle {
          display: flex;
          gap: 1.2rem;
          margin: 1.6rem 0 0.8rem;
        }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 2.4rem;
          margin-top: 2.4rem;
        }
      `}</style>
    </>
  );
};

export default withAuth(CollectionPage);
