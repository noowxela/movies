
import PageWrapper from 'parts/PageWrapper';
import TitleSection from 'parts/NotFound/TitleSection';
import NotFoundImage from 'parts/NotFound/NotFoundImage';
import Button from 'components/UI/Button';
import { useAuth } from 'utils/hocs/AuthProvider';
import withTheme from 'utils/hocs/withTheme';
import getErrorMessage from 'utils/helpers/getErrorMessage';

const AuthRequired = ({
  theme,
  title = "You don't have permission to access this page!",
  subtitle = "You've tried to request a page that requires you to be logged in. Log in with your TMDB account to continue."
}) => {
  const { login, isPending, error } = useAuth();

  return (
    <>
      <PageWrapper className='auth-required'>
        <TitleSection
          theme={theme}
          title={title}
          subtitle={error ? getErrorMessage(error, subtitle) : subtitle} />
        <NotFoundImage
          src='/assets/svgs/empty.svg'
          alt='Authentication required' />
        <Button
          contained
          loading={isPending}
          title='Log in with TMDB'
          onClick={login} />
      </PageWrapper>
      <style jsx>{`
        :global(.auth-required) {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        @media ${theme.mediaQueries.medium} {
          :global(.auth-required) {
            width: 65%;
          }
        }
      `}</style>
    </>
  );
};

export default withTheme(AuthRequired);
