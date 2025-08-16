import { useEffect, useState } from "react";
import { api } from "../api/client";
import { authApi } from "../api/auth";

export function useAuth() {
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
        const userData = await api.get("/users/user/");
        setIsAuthenticated(true);
        setUsername(userData.username);
        setUserId(userData.userID);
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
    setIsAuthenticated(false);
    setUsername(null);
  };

  return { isAuthenticated, username, login, logout };
}