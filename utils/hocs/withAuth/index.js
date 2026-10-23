'use client';

import React from 'react';

import AuthRequired from 'parts/AuthRequired';
import { useAuth } from 'utils/hocs/AuthProvider';

const withAuth = WrappedComponent => {
  return React.forwardRef(function AuthComponent(props, ref) {
    const {
      isAuthenticated,
      error,
      ...rest
    } = useAuth();

    if (!isAuthenticated) {
      return (
        <AuthRequired
          subtitle={error
            ? 'We could not confirm your TMDB session. Log in again to continue.'
            : "You've tried to request a page that requires you to be logged in. Log in with your TMDB account to continue."} />
      );
    }

    return (
      <WrappedComponent
        ref={ref}
        {...props}
        isAuthenticated={isAuthenticated}
        error={error}
        {...rest} />
    );
  });
};

export default withAuth;
