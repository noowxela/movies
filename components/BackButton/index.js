
import useQueryRouter from 'utils/hooks/useQueryRouter';
import Button from 'components/UI/Button';
import ArrowLeftIcon from 'public/assets/svgs/icons/arrow-left.svg';

const BackButton = props => {
  const router = useQueryRouter();

  return (
    <Button
      contained
      title='Back'
      onClick={router.back}
      startIcon={
        <ArrowLeftIcon
          fill='currentColor'
          width='1em' />
      }
      {...props} />
  );
};

export default BackButton;
