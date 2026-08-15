import { Suspense } from 'react';
import type { Metadata } from 'next';

import AppProviders from 'components/AppProviders';
import InlineScript from 'components/InlineScript';
import { SITE_URL } from 'config/app-level';
import CLASS_NAMES from 'utils/constants/class-names';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Next.js Movies',
    template: '%s'
  },
  description: 'The Movies App is a non-trivial demo application built on top of the TMDB (The Movie Database) API',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'Next.js Movies',
    description: 'The Movies App is a non-trivial demo application built on top of the TMDB (The Movie Database) API',
    images: [{
      url: '/movies-meta-image.jpg',
      width: 1200,
      height: 628
    }]
  }
};

const darkModeScript = `
(function() {
  var storageKey = 'darkMode';
  var classNameDark = 'dark';
  var classNameLight = 'light';
  function setClassOnDocumentBody(darkMode) {
    document.body.classList.add(darkMode ? classNameDark : classNameLight);
    document.body.classList.remove(darkMode ? classNameLight : classNameDark);
  }
  var preferDarkQuery = '(prefers-color-scheme: dark)';
  var mql = window.matchMedia(preferDarkQuery);
  var supportsColorSchemeQuery = mql.media === preferDarkQuery;
  var localStorageTheme = null;
  try {
    localStorageTheme = localStorage.getItem(storageKey);
  } catch (err) {}
  var localStorageExists = localStorageTheme !== null;
  if (localStorageExists) {
    localStorageTheme = JSON.parse(localStorageTheme);
  }
  if (localStorageExists) {
    setClassOnDocumentBody(localStorageTheme);
  } else if (supportsColorSchemeQuery) {
    setClassOnDocumentBody(mql.matches);
    localStorage.setItem(storageKey, mql.matches);
  } else {
    var isDarkMode = document.body.classList.contains(classNameDark);
    localStorage.setItem(storageKey, JSON.stringify(isDarkMode));
  }
})();
`;

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}) => (
  <html lang='en' suppressHydrationWarning>
    <body className={CLASS_NAMES.LIGHT} suppressHydrationWarning>
      <InlineScript html={darkModeScript} />
      <AppProviders>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </AppProviders>
    </body>
  </html>
);

export default RootLayout;
