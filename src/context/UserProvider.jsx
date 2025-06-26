import { doLoginLocalStorage,doLogoutLocalStorage,getUserData,isUserLoggedIn } from "../helper/auth";
import UserContext from "./UserContext";
import { useEffect, useState } from "react";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin,setLogin] = useState(true);
  useEffect(() => {
    setUser(getUserData());
    setLogin(isUserLoggedIn());
  }, []);
  const login = (user) => {
    doLoginLocalStorage(user);
    setUser(user);
    setLogin(true);
  };
  const logout = () => {
    doLogoutLocalStorage();
    setUser(null);
    setLogin(false);
  };

  return( 
    <UserContext.Provider 
    value={
            {
            user: user,
            isLogin: isLogin,
            login: login,
            logout: logout,
            }
        }
    >
        {children}
    </UserContext.Provider>
    )
}
export default UserProvider;