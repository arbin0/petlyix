import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/client"; // your axios/fetch client
import { authApi } from "../api/auth"; // logout API

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  username: string | null;
  userId: string | null;
  login: (access: string, refresh: string) => void;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

 const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsAuthenticated(false);
        setUsername(null);
        setUserId(null);
        setLoading(false);   // <--- done checking
        return;
      }
      try {
        const userData = await api.get("/users/user/"); // fetch current user
        setIsAuthenticated(true);
        setUsername(userData.username);
        setUserId(userData.id);
        
      } catch {
        setIsAuthenticated(false);
        setUsername(null);
        setUserId(null);
      }
      finally {
        setLoading(false);   // <--- done checking
      }
    };
    checkAuth();
  }, []);

  const login = async (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setIsAuthenticated(true);
    try{
        const userData = await api.get("/users/user/"); // fetch current user
        setUsername(userData.username);
        setUserId(userData.id);
    }
    catch{
        setIsAuthenticated(false);
        setUsername(null);
        setUserId(null);
    }
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsAuthenticated(false);
    setUsername(null);
    setUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, username, userId, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
