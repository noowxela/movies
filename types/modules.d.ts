import type { ComponentType, ReactNode } from 'react';

declare module 'parts/NotFound' {
  const NotFound: ComponentType<{
    title?: string;
    subtitle?: string;
  }>;
  export default NotFound;
}

declare module 'components/CatalogView' {
  const CatalogView: ComponentType<{
    title: string;
    subtitle: string;
    movies: any;
    filters?: ReactNode;
    baseUrl?: string;
  }>;
  export default CatalogView;
}

declare module 'components/DiscoverControls' {
  const DiscoverControls: ComponentType<{
    mediaType?: 'movie' | 'tv';
  }>;
  export default DiscoverControls;
}

declare module 'components/MenuSelectionSync' {
  const MenuSelectionSync: ComponentType<{
    name?: string;
  }>;
  export default MenuSelectionSync;
}

declare module 'components/MediaDetailView' {
  const MediaDetailView: ComponentType<{
    movie: any;
    recommendedMovies: any;
    baseUrl?: string;
  }>;
  export default MediaDetailView;
}

declare module 'components/PersonDetailView' {
  const PersonDetailView: ComponentType<{
    person: any;
    personMovies: any;
    baseUrl?: string;
  }>;
  export default PersonDetailView;
}

declare module 'page-views/list' {
  const ListPage: ComponentType;
  export default ListPage;
}

declare module 'utils/constants/static-movie-categories' {
  const STATIC_MOVIE_CATEGORIES: { id: string; name: string }[];
  export default STATIC_MOVIE_CATEGORIES;
}

declare module 'utils/constants/static-tv-categories' {
  const STATIC_TV_CATEGORIES: { id: string; name: string }[];
  export default STATIC_TV_CATEGORIES;
}

declare module 'utils/constants/query-params' {
  const QUERY_PARAMS: Record<string, string>;
  export default QUERY_PARAMS;
}

declare module 'utils/constants/select-search' {
  export const SORT_BY_OPTIONS: { value: string; name: string }[];
  export const TV_SORT_BY_OPTIONS: { value: string; name: string }[];
  export const YEAR_OPTIONS: { value: string; name: string }[];
  export const RATING_OPTIONS: { value: string; name: string }[];
  export const WATCH_PROVIDER_OPTIONS: { value: string; name: string }[];
  export const LIST_VISIBILITY: { PUBLIC: string; PRIVATE: string };
  export const YES_OR_NO_OPTIONS: { value: string; name: string }[];
}

declare module 'utils/constants/class-names' {
  const CLASS_NAMES: Record<string, string>;
  export default CLASS_NAMES;
}

declare module 'utils/helpers/media' {
  export const mediaStyles: string;
  export const Media: any;
  export const MediaContextProvider: any;
}

declare module 'config/app-level' {
  export const STORAGE_KEY: string;
  export const SITE_URL: string;
}

declare module 'config/tmdb' {
  export const TMDB_API_KEY: string | undefined;
  export const TMDB_API_VERSION: number;
  export const TMDB_API_NEW_VERSION: number;
  export const TMDB_API_READ_ACCESS_TOKEN: string | undefined;
  export const TMDB_API_BASE_URL: string;
  export const TMDB_BASE_URL: string;
  export const TMDB_IMAGE_BASE_URL: string;
  export const TMDB_PAGE_LIMIT: number;
}

declare module 'components/AppProviders' {
  const AppProviders: ComponentType<{ children?: ReactNode }>;
  export default AppProviders;
}
