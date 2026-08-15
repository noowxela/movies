
import MoviesGridContainer from '../MoviesGridContainer';
import withTheme from 'utils/hocs/withTheme';

const PLACEHOLDER_COUNT = 8;

const MovieListSkeleton = ({
  theme
}) => (
  <>
    <MoviesGridContainer theme={theme}>
      {Array.from({ length: PLACEHOLDER_COUNT }, (_, index) => (
        <div
          key={index}
          className='skeleton-card'>
          <div className='skeleton-poster' />
          <div className='skeleton-title' />
          <div className='skeleton-meta' />
        </div>
      ))}
    </MoviesGridContainer>
    <style jsx>{`
      .skeleton-card {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
      }

      .skeleton-poster,
      .skeleton-title,
      .skeleton-meta {
        background: linear-gradient(
          90deg,
          var(--palette-background-paper) 25%,
          var(--palette-action-hover, rgba(255, 255, 255, 0.08)) 37%,
          var(--palette-background-paper) 63%
        );
        background-size: 400% 100%;
        animation: shimmer 1.4s ease infinite;
        border-radius: 8px;
      }

      .skeleton-poster {
        width: 100%;
        aspect-ratio: 2 / 3;
      }

      .skeleton-title {
        height: 1.8rem;
        width: 80%;
      }

      .skeleton-meta {
        height: 1.4rem;
        width: 40%;
      }

      @keyframes shimmer {
        0% {
          background-position: 100% 0;
        }
        100% {
          background-position: 0 0;
        }
      }
    `}</style>
  </>
);

export default withTheme(MovieListSkeleton);
