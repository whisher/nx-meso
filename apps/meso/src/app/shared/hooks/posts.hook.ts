// Redux
import { useSelector } from 'react-redux';

// Store
import {
  selectPostsData,
  selectPostsError,
  selectPostsLoaded,
} from '../../store/posts';

const usePosts = () => {
  const data = useSelector(selectPostsData);
  const error = useSelector(selectPostsError);
  const loaded = useSelector(selectPostsLoaded);
  return { data, error, loaded };
};

export default usePosts;
