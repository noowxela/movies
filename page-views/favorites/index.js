'use client';

import CollectionPage from 'parts/CollectionPage';
import { getFavoriteMedia } from 'services/account';
import LINKS from 'utils/constants/links';
import QUERY_PARAMS from 'utils/constants/query-params';
import STATIC_MOVIE_CATEGORIES from 'utils/constants/static-movie-categories';

const Favorites = props => (
  <CollectionPage
    {...props}
    title='Favorites'
    subtitle='Your TMDB favorites'
    emptyMessage='You have not favorited anything yet. Browse a title and tap Add to favorites.'
    createLabel='Browse popular movies'
    createHref={{
      pathname: LINKS.HOME.HREF,
      query: {
        [QUERY_PARAMS.CATEGORY]: STATIC_MOVIE_CATEGORIES[0].name,
        [QUERY_PARAMS.PAGE]: 1
      }
    }}
    fetchCollection={getFavoriteMedia} />
);

export default Favorites;
