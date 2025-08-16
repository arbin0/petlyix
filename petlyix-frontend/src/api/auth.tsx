import { api } from './client';
import { type LoginCredentials, type TokenResponse } from '../types/api';

export const authApi = {
  login: (credentials: LoginCredentials): Promise<TokenResponse> =>
    api.post<TokenResponse, LoginCredentials>('/users/login/', credentials),
 
  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem("refreshToken");
    
    try {
      // Call logout endpoint with refresh token if available
      if (refreshToken) {
        await api.post('/users/logout/', { refresh: refreshToken });
      }
    } catch (error) {
      console.warn("Server logout failed, but continuing with local logout:", error);
    } finally {
      // Always clear local storage regardless of server response
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
 
};