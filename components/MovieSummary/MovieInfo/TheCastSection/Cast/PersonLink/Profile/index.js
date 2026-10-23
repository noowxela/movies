'use client';

import { PROFILE_PLACEHOLDER_IMAGE_PATH } from 'utils/constants/image-paths';

const PROFILE_SIZE = 44;

const Profile = ({ src, alt }) => (
  <>
    <img
      className='profile'
      src={src || PROFILE_PLACEHOLDER_IMAGE_PATH}
      alt={alt || ''}
      width={PROFILE_SIZE}
      height={PROFILE_SIZE}
      onError={event => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = PROFILE_PLACEHOLDER_IMAGE_PATH;
      }} />
    <style jsx>{`
      .profile {
        display: block;
        width: ${PROFILE_SIZE}px;
        height: ${PROFILE_SIZE}px;
        border-radius: 50%;
        object-fit: cover;
      }
    `}</style>
  </>
);

export default Profile;
