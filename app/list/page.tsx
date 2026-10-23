import ListPage from 'page-views/list';
import { SITE_URL } from 'config/app-level';
import { TMDB_IMAGE_BASE_URL } from 'config/tmdb';
import QUERY_PARAMS from 'utils/constants/query-params';
import { tmdbFetch } from 'lib/tmdb';
import { readParam, type SearchParams } from 'lib/search-params';

export async function generateMetadata({
  searchParams
}: {
  searchParams: Promise<SearchParams>
}) {
  const query = await searchParams;
  const listId = readParam(query, QUERY_PARAMS.ID);
  const page = readParam(query, QUERY_PARAMS.PAGE) || '1';

  if (!listId) {
    return { title: 'List' };
  }

  try {
    const list = await tmdbFetch<Record<string, any>>(`/4/list/${listId}`, { page });
    const description = list.description || `A TMDB list by ${list.created_by?.username || list.created_by?.name || 'a Movies user'}.`;
    const image = list.backdrop_path
      ? `${TMDB_IMAGE_BASE_URL}w1280${list.backdrop_path}`
      : `${SITE_URL}/movies-meta-image.jpg`;
    const url = `${SITE_URL}/list?${QUERY_PARAMS.ID}=${listId}&${QUERY_PARAMS.PAGE}=${page}`;

    return {
      title: list.name || 'List',
      description,
      openGraph: {
        type: 'website',
        url,
        title: list.name || 'List',
        description,
        images: [{ url: image }]
      },
      twitter: {
        card: 'summary_large_image',
        title: list.name || 'List',
        description,
        images: [image]
      }
    };
  } catch {
    return { title: 'List' };
  }
}

const Page = () => <ListPage />;

export default Page;
