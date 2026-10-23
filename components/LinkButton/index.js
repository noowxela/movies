import Link from 'lib/legacy-link';

import Button from 'components/UI/Button';

const LinkButton = ({
  href,
  anchorProps = {},
  buttonProps = {}
}) => (
  <Link
    href={href}
    {...anchorProps}>
    <Button {...buttonProps} />
  </Link>
);

export default LinkButton;
