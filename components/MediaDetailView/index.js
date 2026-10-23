'use client';

import PageWrapper from 'parts/PageWrapper';
import RecommendedMovieList from 'components/RecommendedMovieList';
import MovieSummary from 'components/MovieSummary';
import { TMDB_IMAGE_BASE_URL } from 'config/tmdb';

const MediaDetailView = ({
  movie,
  recommendedMovies,
  baseUrl = TMDB_IMAGE_BASE_URL
}) => (
  <PageWrapper>
    <MovieSummary
      baseUrl={baseUrl}
      movie={movie} />
    <RecommendedMovieList
      baseUrl={baseUrl}
      recommendedMovies={recommendedMovies} />
  </PageWrapper>
);

export default MediaDetailView;
