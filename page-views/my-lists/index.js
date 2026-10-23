'use client';


import { useEffect, useState } from 'react';
import PageTitle from 'components/PageTitle';
import useQueryRouter from 'utils/hooks/useQueryRouter';
import { animateScroll as scroll } from 'react-scroll';

import Header from 'parts/Header';
import NotFound from 'parts/NotFound';
import PageWrapper from 'parts/PageWrapper';
import PaddingWrapper from 'parts/PaddingWrapper';
import MyTMDBLists from 'components/MyTMDBLists';
import Loader from 'components/UI/Loader';
import Button from 'components/UI/Button';
import Annotation from 'components/Annotation';
import withAuth from 'utils/hocs/withAuth';
import { TMDB_API_NEW_VERSION, TMDB_IMAGE_BASE_URL } from 'config/tmdb';
import QUERY_PARAMS from 'utils/constants/query-params';
import STATUSES from 'utils/constants/statuses';
import LINKS from 'utils/constants/links';
import tmdbAPI from 'services/tmdbAPI';
import getErrorMessage from 'utils/helpers/getErrorMessage';
import Link from 'lib/legacy-link';

const MyLists = ({
  accountId,
  accessToken
}) => {
  const { query, asPath, push, replace } = useQueryRouter();

  const [status, setStatus] = useState(STATUSES.IDLE);
  // TODO: could handle errors
  const [error, setError] = useState(null);

  const [myLists, setMyLists] = useState(null);

  const page = Number(query[QUERY_PARAMS.PAGE]);

  useEffect(() => {
    (async () => {
      if (!page) return;
      if (!accountId) return;
      if (!accessToken) return;

      scroll.scrollToTop({smooth: true});

      try {
        setStatus(STATUSES.PENDING);
        const response = await tmdbAPI.get(`/${TMDB_API_NEW_VERSION}/account/${accountId}/lists`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            page
          }
        });
        const myLists = response.data;
        setMyLists(myLists);
      } catch (error) {
        setStatus(STATUSES.REJECTED);
        setError(error);
      }
    })();
  }, [page, accountId, accessToken]);

  useEffect(() => {
    if (!myLists) return;

    setStatus(STATUSES.RESOLVED);
  }, [myLists]);

  if (status === STATUSES.IDLE || status === STATUSES.PENDING) {
    return <Loader />;
  }

  if (status === STATUSES.REJECTED) {
    return (
      <NotFound
        title='Unable to load your lists'
        subtitle={getErrorMessage(error, 'We could not load your TMDB lists. Try logging in again.')} />
    );
  }

  if (status === STATUSES.RESOLVED) {
    const hasLists = myLists?.results?.length > 0;

    return (
      <>
        <PageTitle>My Lists</PageTitle>
        <PageWrapper>
          <PaddingWrapper>
            <Header
              title='My Lists'
              subtitle='TMDB' />
            {hasLists ? (
              <MyTMDBLists
                myLists={myLists}
                baseUrl={TMDB_IMAGE_BASE_URL} />
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 24, marginTop: 24}}>
                <Annotation>
                  You have not created any lists yet. Start a list to collect movies you want to share.
                </Annotation>
                <Link href={LINKS.ADD_OR_EDIT_LIST.HREF}>
                  <Button
                    contained
                    title='Create a list' />
                </Link>
              </div>
            )}
          </PaddingWrapper>
        </PageWrapper>
      </>
    );
  }
};

export default withAuth(MyLists);
