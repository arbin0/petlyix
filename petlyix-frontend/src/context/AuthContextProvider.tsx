import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api/client"; // your axios/fetch client
import { authApi } from "../api/auth"; // logout API

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  userId: string | null;
  login: (access: string, refresh: string) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setIsAuthenticated(false);
        setUsername(null);
        setUserId(null);
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
    };
    checkAuth();
  }, []);

  const login = (access: string, refresh: string) => {
    localStorage.setItem("accessToken", access);
    localStorage.setItem("refreshToken", refresh);
    setIsAuthenticated(true);
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
      value={{ isAuthenticated, username, userId, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthContextProvider");
  return ctx;
};
