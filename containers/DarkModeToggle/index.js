

// MEMO: inspired by https://web.dev/prefers-color-scheme/#the-lessdark-mode-togglegreater-custom-element
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import useDarkMode from 'use-dark-mode';

import Toggle from 'components/UI/Toggle';
import CLASS_NAMES from 'utils/constants/class-names';
import withTheme from 'utils/hocs/withTheme';

const DarkModeToggle = ({
  theme,
  id,
  className
}) => {
  const darkMode = useDarkMode(false, {
    classNameDark: CLASS_NAMES.DARK,
    classNameLight: CLASS_NAMES.LIGHT
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }
    const prefix = darkMode.value ? 'dark' : 'light';
    const setHref = (selector, href) => {
      const node = document.querySelector(selector);
      if (node) {
        node.setAttribute('href', href);
      }
    };

    setHref('link[rel="apple-touch-icon"]', `/${prefix}-apple-touch-icon.png`);
    setHref('link[rel="icon"][sizes="32x32"]', `/${prefix}-favicon-32x32.png`);
    setHref('link[rel="icon"][sizes="16x16"]', `/${prefix}-favicon-16x16.png`);
    setHref('link[rel="manifest"]', `/${prefix}-manifest.webmanifest`);
    setHref('link[rel="mask-icon"]', `/${prefix}-safari-pinned-tab.svg`);

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) {
      themeColor.setAttribute('content', darkMode.value ? '#fafafa' : '#303030');
    }
  }, [darkMode.value, mounted]);

  return (
    <>
      <div className={clsx('dark-mode-toggle', className)}>
        <button
          type='button'
          onClick={darkMode.disable}>
          ☀
        </button>
        <Toggle
          id={id}
          checked={mounted ? darkMode.value : false}
          onChange={darkMode.toggle} />
        <button
          type='button'
          onClick={darkMode.enable}>
          ☾
        </button>
      </div>
      <style jsx>{`
        .dark-mode-toggle {
          display: flex;
        }

        .dark-mode-toggle > button {
          font-size: 2.125rem;
          background: none;
          border: none;
          line-height: 0;
          color: #ffb74d;
          cursor: pointer;
          transition: color ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut};
        }

        .dark-mode-toggle > button:last-child {
          color: #666;
        }
    
        .dark-mode-toggle > button:focus {
          outline: none;
        }

        :global(body.dark) .dark-mode-toggle > button {
          color: #999;
        }
        
        :global(body.dark) .dark-mode-toggle > button:last-child {
          color: lightblue;
        }
      `}</style>
    </>
  );
};

export default withTheme(DarkModeToggle);
