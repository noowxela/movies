'use client';

import { useEffect } from 'react';

const PageTitle = ({ children }) => {
  useEffect(() => {
    if (children) {
      document.title = children;
    }
  }, [children]);

  return null;
};

export default PageTitle;
