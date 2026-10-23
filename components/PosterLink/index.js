import React from 'react';
import clsx from 'clsx';

import Link from 'lib/legacy-link';

import withTheme from 'utils/hocs/withTheme';

const PosterLink = React.forwardRef(({
  theme,
  href,
  children,
  className,
  ...rest
}, ref) => (
  <>
    <Link
      href={href}
      ref={ref}
      className={clsx('poster-link-root', className)}
      {...rest}>
      {children}
    </Link>
    <style jsx>{`
      :global(a.poster-link-root) {
        position: relative;
        display: flex;
        flex-direction: column;
        transition: transform ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut};
      }

      :global(a.poster-link-root):hover {
        transform: scale(1.03);
      }

      :global(a.poster-link-root):hover::after {
        transform: scaleY(1);
      }

      :global(a.poster-link-root)::after {
        content: '';
        position: absolute;
        z-index: -99;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform: scaleY(0);
        transform-origin: top;
        background-color: var(--palette-background-paper);
        box-shadow: ${theme.shadows[1]};
      }
    `}</style>
  </>
));

export default withTheme(PosterLink);
