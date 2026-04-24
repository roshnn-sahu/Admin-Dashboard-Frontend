import { createContext, useContext } from "react";
import useAuthCheck from "../Hooks/useAuthCheck";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthCheck(); // userData, checkAuth, isLoading, etc.
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
