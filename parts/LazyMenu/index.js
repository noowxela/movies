
import Menu from 'components/Menu';
import LazyLoadingErrorBoundary from 'utils/hocs/LazyLoadingErrorBoundary';

const LazyMenu = props => (
  <LazyLoadingErrorBoundary>
    <Menu {...props} />
  </LazyLoadingErrorBoundary>
);

export default LazyMenu;
