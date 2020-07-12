// Redux
import { useSelector } from "react-redux";

// Store
import {
  selectAuthError,
  selectAuthIsAuthenticated,
  selectAuthIsLoading,
} from "../../store/auth";

const useAuth = () => {
  const hasError = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectAuthIsAuthenticated);
  const isLoading = useSelector(selectAuthIsLoading);
  return { hasError, isAuthenticated, isLoading };
};

export default useAuth;
