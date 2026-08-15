import React from 'react';
import clsx from 'clsx';

import Link from 'lib/legacy-link';

import withTheme from 'utils/hocs/withTheme';

const MenuItemLink = React.forwardRef(({
  theme,
  href,
  children,
  selected,
  className,
  ...rest
}, ref) => (
  <>
    <Link
      href={href}
      ref={ref}
      className={clsx('menu-item-link', selected && 'selected', className)}
      {...rest}>
      {children}
    </Link>
    <style jsx>{`
      :global(a.menu-item-link) {
        outline: none;
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        font-weight: ${theme.typography.fontWeightBold};
        line-height: 1;
        color: var(--palette-primary-main);
      }

      :global(a.menu-item-link.selected) {
        color: var(--palette-secondary-main);
      }

      :global(a.menu-item-link):hover {
        text-decoration: underline;
      }
    `}</style>
  </>
));

export default withTheme(MenuItemLink);
