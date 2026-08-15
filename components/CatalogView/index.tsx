'use client';

import type { ReactNode } from 'react';

import Header from 'parts/Header';
import PageWrapper from 'parts/PageWrapper';
import PaddingWrapper from 'parts/PaddingWrapper';
import MovieList from 'components/MovieList';
import { TMDB_IMAGE_BASE_URL } from 'config/tmdb';

const CatalogView = ({
  title,
  subtitle,
  movies,
  filters = null,
  baseUrl = TMDB_IMAGE_BASE_URL
}: {
  title: string;
  subtitle: string;
  movies: any;
  filters?: ReactNode;
  baseUrl?: string;
}) => (
  <PageWrapper>
    <PaddingWrapper>
      <Header
        title={title}
        subtitle={subtitle} />
      {filters}
      <MovieList
        movies={movies}
        baseUrl={baseUrl} />
    </PaddingWrapper>
  </PageWrapper>
);

export default CatalogView;
