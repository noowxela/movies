'use client';

import CollectionPage from 'parts/CollectionPage';
import { getWatchlistMedia } from 'services/account';
import LINKS from 'utils/constants/links';
import QUERY_PARAMS from 'utils/constants/query-params';
import STATIC_MOVIE_CATEGORIES from 'utils/constants/static-movie-categories';

const Watchlist = props => (
  <CollectionPage
    {...props}
    title='Watchlist'
    subtitle='Your TMDB watchlist'
    emptyMessage='Your watchlist is empty. Open a title and tap Add to watchlist to save it for later.'
    createLabel='Browse popular movies'
    createHref={{
      pathname: LINKS.HOME.HREF,
      query: {
        [QUERY_PARAMS.CATEGORY]: STATIC_MOVIE_CATEGORIES[0].name,
        [QUERY_PARAMS.PAGE]: 1
      }
    }}
    fetchCollection={getWatchlistMedia} />
);

export default Watchlist;
