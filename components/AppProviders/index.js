'use client';

import { Provider } from 'react-redux';

import { useStore } from 'store';
import ThemeProvider from 'utils/hocs/ThemeProvider';
import Layout from 'parts/Layout';
import { AuthProvider } from 'utils/hocs/AuthProvider';

const AppProviders = ({ children }) => {
  const store = useStore();

  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <Layout>
            {children}
          </Layout>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default AppProviders;
