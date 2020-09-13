// Redux
import { useSelector } from 'react-redux';

// Store
import {
  selectFeedData,
  selectFeedError,
  selectFeedLoaded,
} from '../../store/feed';

const useFeed = () => {
  const data = useSelector(selectFeedData);
  const error = useSelector(selectFeedError);
  const loaded = useSelector(selectFeedLoaded);
  return { data, error, loaded };
};

export default useFeed;
