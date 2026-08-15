
import { TMDB_IMAGE_BASE_URL } from 'config/tmdb';

const PROVIDER_GROUPS = [
  {key: 'flatrate', label: 'Stream'},
  {key: 'free', label: 'Free'},
  {key: 'ads', label: 'Ads'},
  {key: 'rent', label: 'Rent'},
  {key: 'buy', label: 'Buy'}
];

const pickRegion = results => {
  if (!results) return null;
  return results.SG || results.US || results.GB || Object.values(results)[0] || null;
};

const WatchProviders = ({
  watchProviders
}) => {
  const region = pickRegion(watchProviders?.results);
  const groups = PROVIDER_GROUPS
    .map(group => ({
      ...group,
      providers: region?.[group.key] || []
    }))
    .filter(group => group.providers.length > 0);

  if (groups.length === 0) {
    return null;
  }

  return (
    <section className='watch-providers'>
      <h3 className='heading'>Where to watch</h3>
      {groups.map(group => (
        <div
          key={group.key}
          className='group'>
          <h4 className='group-label'>{group.label}</h4>
          <ul className='provider-list'>
            {group.providers.map(provider => (
              <li
                key={provider.provider_id}
                className='provider'>
                {provider.logo_path && (
                  <img
                    src={`${TMDB_IMAGE_BASE_URL}w92${provider.logo_path}`}
                    alt=''
                    width='40'
                    height='40' />
                )}
                <span>{provider.provider_name}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <style jsx>{`
        .watch-providers {
          margin: 0 0 3.2rem;
        }

        .heading {
          font-size: 1.8rem;
          margin: 0 0 1.2rem;
          color: var(--palette-text-primary);
        }

        .group {
          margin-bottom: 1.2rem;
        }

        .group-label {
          font-size: 1.4rem;
          margin: 0 0 0.8rem;
          color: var(--palette-text-secondary);
        }

        .provider-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem 1.6rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .provider {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          font-size: 1.4rem;
          color: var(--palette-text-primary);
        }

        .provider img {
          border-radius: 8px;
          object-fit: cover;
        }
      `}</style>
    </section>
  );
};

export default WatchProviders;
