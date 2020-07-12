// Redux
import { useSelector } from "react-redux";

// Store
import {
  selectUsersData,
  selectUsersError,
  selectUsersLoaded,
} from "../../store/users";

const useUsers = () => {
  const data = useSelector(selectUsersData);
  const error = useSelector(selectUsersError);
  const loaded = useSelector(selectUsersLoaded);
  return { data, error, loaded };
};

export default useUsers;
