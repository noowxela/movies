
import { useSelector } from 'react-redux';

import Logo from 'components/Logo';
import SectionHeading from './SectionHeading';
import MenuItem from './MenuItem';
import MenuItemLink from './MenuItemLink';
import TMDBMark from 'components/TMDBMark';
import LINKS from 'utils/constants/links';
import QUERY_PARAMS from 'utils/constants/query-params';

const renderStaticCategories = (staticCategories, selectedMenuItemName, closeMenu = null) => (
  staticCategories.map(staticCategory => (
    <MenuItemLink
      key={staticCategory.id}
      href={{
        pathname: LINKS.HOME.HREF,
        query: {
          [QUERY_PARAMS.CATEGORY]: staticCategory.name,
          [QUERY_PARAMS.PAGE]: 1
        }
      }}
      onClick={closeMenu}
      selected={staticCategory.name === selectedMenuItemName}>
      <MenuItem title={staticCategory.name} />
    </MenuItemLink>
  ))
);

const renderTVCategories = (staticCategories, selectedMenuItemName, closeMenu = null) => (
  staticCategories.map(staticCategory => (
    <MenuItemLink
      key={staticCategory.id}
      href={{
        pathname: LINKS.TV.HREF,
        query: {
          [QUERY_PARAMS.CATEGORY]: staticCategory.name,
          [QUERY_PARAMS.PAGE]: 1
        }
      }}
      onClick={closeMenu}
      selected={staticCategory.name === selectedMenuItemName}>
      <MenuItem title={staticCategory.name} />
    </MenuItemLink>
  ))
);

const renderGenres = (genres, selectedMenuItemName, closeMenu = null, pathname = LINKS.GENRE.HREF) => (
  genres.map(genre => (
    <MenuItemLink
      key={genre.id}
      href={{
        pathname,
        query: {
          [QUERY_PARAMS.ID]: genre.id,
          [QUERY_PARAMS.NAME]: genre.name,
          [QUERY_PARAMS.PAGE]: 1
        }
      }}
      onClick={closeMenu}
      selected={genre.name === selectedMenuItemName}>
      <MenuItem title={genre.name} />
    </MenuItemLink>
  ))
);

const Menu = ({
  isMobile,
  closeMenu,
  ...rest
}) => {
  const staticCategories = useSelector(state => state.general.staticCategories);
  const staticTVCategories = useSelector(state => state.general.staticTVCategories);
  const genres = useSelector(state => state.general.genres);
  const tvGenres = useSelector(state => state.general.tvGenres);
  const selectedMenuItemName = useSelector(state => state.general.selectedMenuItemName);

  return (
    <>
      <nav {...rest}>
        {!isMobile && <Logo />}
        <SectionHeading>Discover</SectionHeading>
        {renderStaticCategories(staticCategories, selectedMenuItemName, closeMenu)}
        <SectionHeading>TV</SectionHeading>
        {renderTVCategories(staticTVCategories, selectedMenuItemName, closeMenu)}
        <SectionHeading>Genres</SectionHeading>
        {renderGenres(genres, selectedMenuItemName, closeMenu)}
        <SectionHeading>TV Genres</SectionHeading>
        {renderGenres(tvGenres, selectedMenuItemName, closeMenu, LINKS.TV_GENRE.HREF)}
        <TMDBMark className='tmdb-mark' />
      </nav>
      <style jsx>{`
        :global(.copyright) {
          display: flex;
          justify-content: center;
          margin: 24px 8px;
        }

        :global(.tmdb-mark) {
          margin: 16px 8px;
        }
      `}</style>
    </>
  );
};

export default Menu;
