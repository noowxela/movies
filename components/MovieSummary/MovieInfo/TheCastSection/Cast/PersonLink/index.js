'use client';

import Link from 'lib/legacy-link';
import Profile from './Profile';
import LINKS from 'utils/constants/links';
import { W185H278 } from 'config/image-sizes';
import QUERY_PARAMS from 'utils/constants/query-params';

const PersonLink = ({
  person,
  baseUrl
}) => (
  <Link
    className='person-link'
    title={person.name}
    href={{
      pathname: LINKS.PERSON.HREF,
      query: {
        [QUERY_PARAMS.ID]: person.id,
        [QUERY_PARAMS.PAGE]: 1
      }
    }}>
    <Profile
      src={person.profile_path ? `${baseUrl}w${W185H278.WIDTH}${person.profile_path}` : undefined}
      alt={person.name} />
  </Link>
);

export default PersonLink;
