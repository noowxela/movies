'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';

import Sidebar from 'containers/Sidebar';
import AppHeader from 'containers/AppHeader';
import MyHead from 'components/MyHead';
import SearchBar from 'containers/SearchBar';
import DarkModeToggle from 'containers/DarkModeToggle';
import TheUser from 'containers/TheUser';
import MainWrapper from './MainWrapper';
import ContentWrapper from './ContentWrapper';
import init from 'actions/init';
import withTheme from 'utils/hocs/withTheme';
import { Media, MediaContextProvider } from 'utils/helpers/media';

const Layout = ({
  theme,
  children
}) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === '/error') {
      return;
    }
    dispatch(init());
  }, [dispatch, pathname]);

  return (
    <>
      <MyHead />
      <MediaContextProvider disableDynamicMediaQueries>
        <MainWrapper theme={theme}>
          <Media at='sm'>
            <AppHeader />
          </Media>
          <Media greaterThan='sm'>
            <Sidebar />
            <div className='desktop-widgets-container'>
              <SearchBar id='desktop' />
              <DarkModeToggle
                id='desktop'
                className='left-margin' />
              <TheUser />
            </div>
            <style jsx>{`
              .desktop-widgets-container {
                position: absolute;
                top: 0;
                right: 0;
                padding: 2rem;
                display: flex;
                align-items: center;
              }

              .desktop-widgets-container > :global(*:not(:first-child)) {
                margin-left: 12px;
              }
            `}</style>
          </Media>
          <ContentWrapper theme={theme}>
            {children}
          </ContentWrapper>
        </MainWrapper>
      </MediaContextProvider>
    </>
  );
};

export default withTheme(Layout);
