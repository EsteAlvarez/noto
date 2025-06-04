import { useState, useEffect, createContext, useContext } from "react";
import { account } from "../client/appwrite";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const registerUser = async (email, password, name) => {
    try {
      const response = await account.create("unique()", email, password, name);
    } catch (err) {
      console.error(err);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      const userData = await account.get();
      setUser(userData);
      console.log("Usuario logeado" + userData);
    } catch (err) {
      console.error(err);
    }
  };

  const logoutUser = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (err) {
      setUser(null);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ registerUser, loginUser, logoutUser, loading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
