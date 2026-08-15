
# next-movies

This is a Movies App built using Next.js, React and [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

## Demo

Run the app locally after setup:

```bash
npm run dev
```

Then open [http://localhost:8080](http://localhost:8080).

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` to your deployed origin so Open Graph tags and share links use the correct host.

## Contributing

Contributions are always welcome! 

For large changes, please file an issue to discuss your proposed changes with us before working on a PR :)

## Installation 

Clone and install the dependencies for `movies` locally:
```bash 
  git clone https://github.com/noowxela/movies.git
  cd movies 
  npm install
```

## Quick setup

1. Take a copy of .env.local.example and re-name to .env.local
2. Get your TMDb API key
3. Get your TMDB API read access token
4. Enter the details into the .env.local file
    
## Running locally

* `npm run dev`: dev build
* `npm run build`: production build
* `npm run start`: start the project
* `npm run lint`: lint the project
* `npm run test:e2e`: Playwright smoke tests (first run `npx playwright install chromium`)
* `npm run vercel-deploy`: deploy to vercel
* `npm run analyze`: bundle analysis
* (`analyze:server` and `analyze:browser` are available too)

GitHub Actions runs `npm run lint` and `npm run build` on every push and pull request, plus the Playwright smoke tests. Add `TMDB_API_KEY` and `TMDB_API_READ_ACCESS_TOKEN` as repository secrets so catalog pages and e2e can call TMDB.

## Tech Stack

Built with:

* Next.js App Router
* TypeScript (incremental, `allowJs`)
* React 18
* Redux and Redux Thunk (sidebar/config)
* TMDB proxy via Route Handlers
* react-glider
* react-lazyload
* react-modal-video
* react-scroll
* react-select-search
* redaxios
* use-dark-mode
* @artsy/fresnel
* @loadable/component

## Images

Posters and artwork use [`next/image`](https://nextjs.org/docs/pages/building-your-application/optimizing/images) with TMDB remote patterns. SVG placeholders still use a native `img` because Next.js does not optimize SVGs by default.

## Authors

- [@noowxela](https://github.com/noowxela)

Based on the original `create-react-app` foundation by [@fidalgodev](https://github.com/fidalgodev/movie-library-react).

Based on the original `next-movies` foundation by [@tastejs](https://github.com/tastejs/next-movies).

## License

[MIT](https://choosealicense.com/licenses/mit/)