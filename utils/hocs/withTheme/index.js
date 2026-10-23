'use client';

import React from 'react';
import ThemeContext from 'contexts/theme-context';

/**
 * @template {Record<string, any>} P
 * @param {import('react').ComponentType<P & { theme?: any, ref?: any }>} WrappedComponent
 * @returns {import('react').ComponentType<Omit<P, 'theme'>>}
 */
function withTheme(WrappedComponent) {
  const ThemeComponent = React.forwardRef(function ThemeComponent(props, ref) {
    return (
      <ThemeContext.Consumer>
        {themeContext => (
          <WrappedComponent
            ref={ref}
            theme={themeContext}
            {...props} />
        )}
      </ThemeContext.Consumer>
    );
  });

  return ThemeComponent;
}

export default withTheme;
