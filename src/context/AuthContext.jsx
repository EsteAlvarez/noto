import { useState, useEffect, createContext, useContext } from "react";
import { account } from "../client/appwrite";

export const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingLoginUser, setLoadingLoginUser] = useState(false);
  const [loadingRegisterUser, setLoadingRegisterUser] = useState(false);
  const [loadingUser, setloadingUser] = useState(true);

  const registerUser = async (email, password, name) => {
    setLoadingRegisterUser(true);
    try {
      await account.create("unique()", email, password, name);
      return { success: true };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.message || "Error al registrar usuario",
      };
    } finally {
      setLoadingRegisterUser(false);
    }
  };

  const loginUser = async (email, password) => {
    setLoadingLoginUser(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const userData = await account.get();
      setUser(userData);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.message || "Error al iniciar sesión",
      };
    } finally {
      setLoadingLoginUser(false);
    }
  };

  const logoutUser = async () => {
    try {
      await account.deleteSession("current");
      setUser(null);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const userData = await account.get();
      setUser(userData);
    } catch (err) {
      if (err.code === 401) {
        setUser(null);
      } else {
        console.error("Error al obtener el usuario:", err);
      }
    } finally {
      setloadingUser(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        registerUser,
        loginUser,
        logoutUser,
        loadingUser,
        loadingLoginUser,
        loadingRegisterUser,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
