import { useState, createContext, useContext } from "react";
import { account } from "../client/appwrite";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const registerUser = async (email, password, name) => {
    try {
      const response = await account.create("unique()", email, password, name);
      //console.log("usuario creado:" + response);
    } catch (err) {
      console.error(err);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = account.createEmailPasswordSession(email, password);
      setUser(response);
      //console.log(user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AuthContext.Provider value={{ registerUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
