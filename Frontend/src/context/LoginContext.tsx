import { createContext } from "react";

interface LoginContextType {
  isLoggedIn: boolean | undefined;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const LoginContext = createContext<LoginContextType>({
  isLoggedIn: undefined,
  setIsLoggedIn: () => {},
});

export default LoginContext;
