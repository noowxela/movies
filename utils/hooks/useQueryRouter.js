'use client';

import { useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const buildUrl = (url, fallbackPathname) => {
  if (typeof url === 'string') {
    return url;
  }

  const pathname = url.pathname || fallbackPathname || '/';
  const params = new URLSearchParams();
  Object.entries(url.query || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  });
  const queryString = params.toString();
  return queryString ? `${pathname}?${queryString}` : pathname;
};

const useQueryRouter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = useMemo(
    () => Object.fromEntries(searchParams.entries()),
    [searchParams]
  );

  return {
    pathname,
    query,
    asPath: `${pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`,
    push: url => router.push(buildUrl(url, pathname)),
    replace: url => router.replace(buildUrl(url, pathname)),
    back: () => router.back()
  };
};

const redirectTo = href => {
  if (typeof window === 'undefined') {
    return;
  }

  const nextUrl = typeof href === 'string' ? href : buildUrl(href, '/');
  const currentUrl = `${window.location.pathname}${window.location.search}`;
  if (currentUrl === nextUrl || window.location.pathname === nextUrl) {
    return;
  }

  window.location.assign(nextUrl);
};

export {
  buildUrl,
  redirectTo
};

export default useQueryRouter;
