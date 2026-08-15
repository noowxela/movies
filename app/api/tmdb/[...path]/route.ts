import { NextRequest, NextResponse } from 'next/server';

const TMDB_API_BASE_URL = 'https://api.themoviedb.org';

const firstEnv = (...values: Array<string | undefined>) => (
  values.find(value => typeof value === 'string' && value.trim())?.trim() || ''
);

const getReadAccessToken = () => firstEnv(
  process.env.TMDB_API_READ_ACCESS_TOKEN,
  process.env.NEXT_PUBLIC_TMDB_API_READ_ACCESS_TOKEN
);

const getApiKey = () => firstEnv(
  process.env.TMDB_API_KEY,
  process.env.NEXT_PUBLIC_TMDB_API_KEY
);

type RouteContext = {
  params: Promise<{ path: string[] }>
};

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return proxy(request, path);
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return proxy(request, path);
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return proxy(request, path);
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { path } = await params;
  return proxy(request, path);
}

async function proxy(request: NextRequest, pathSegments: string[]) {
  const target = new URL(`${TMDB_API_BASE_URL}/${pathSegments.join('/')}`);
  request.nextUrl.searchParams.forEach((value, key) => {
    if (key !== 'api_key') {
      target.searchParams.set(key, value);
    }
  });

  const incomingAuth = request.headers.get('authorization');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json;charset=utf-8',
    Authorization: incomingAuth || `Bearer ${getReadAccessToken()}`
  };

  if (!incomingAuth && getApiKey() && !target.searchParams.has('api_key')) {
    target.searchParams.set('api_key', getApiKey());
  }

  const init: RequestInit = {
    method: request.method,
    headers,
    cache: 'no-store'
  };

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.text();
  }

  const response = await fetch(target.toString(), init);
  const body = await response.text();

  return new NextResponse(body, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/json'
    }
  });
}
