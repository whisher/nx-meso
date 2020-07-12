// Redux
import { useSelector } from "react-redux";

// Store
import {
  selectAccountData,
  selectAccountError,
  selectAccountLoaded,
} from "../../store/account";

const useAccount = () => {
  const data = useSelector(selectAccountData);
  const error = useSelector(selectAccountError);
  const loaded = useSelector(selectAccountLoaded);
  return { data, error, loaded };
};

export default useAccount;
