import { useState, useEffect, createContext, useContext } from "react";
import { account } from "../client/appwrite";

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setloadingUser] = useState(true);

  const registerUser = async (email, password, name) => {
    try {
      await account.create("unique()", email, password, name);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.message || "Error al registrar usuario",
      };
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
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error al iniciar sesión",
      };
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
      setloadingUser(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ registerUser, loginUser, logoutUser, loadingUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
