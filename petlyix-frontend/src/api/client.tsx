const baseUrl = import.meta.env.VITE_API_BASE_URL;


/**
 * Recursively extracts the first error message from a DRF-style response
 */
function extractFirstError(errorObj: any): string | null {
  if (!errorObj) return null;

  if (typeof errorObj === 'string') return errorObj;

  if (Array.isArray(errorObj) && errorObj.length) {
    return extractFirstError(errorObj[0]);
  }

  if (typeof errorObj === 'object') {
    for (const key of Object.keys(errorObj)) {
      const message = extractFirstError(errorObj[key]);
      if (message) return message;
    }
  }

  return null;
}


/**
 * Refreshes the access token using the refresh token
 * Called automatically when we get 401 errors
 */

const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const response = await fetch(`${baseUrl}/users/token/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();
  localStorage.setItem('accessToken', data.access);
  console.log("Gpt New Access Token")
  if (data.refresh) {
    localStorage.setItem('refreshToken', data.refresh);
    console.log("Gpt New Refresh Token")
  }
  
  return data.access;
};

/**
 * Main API client function
 */
const apiClient = async <T = any>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  const url = `${baseUrl}${endpoint}`;
  const token = localStorage.getItem('accessToken');
  
  // Prepare headers
  const headers: Record<string, string> = {
    ...(options.headers as Record<string, string> || {}),
  };
  
 
  const isFormData = options.body instanceof FormData;
  if (!isFormData && options.body && typeof options.body === 'string') {
    headers['Content-Type'] = 'application/json';
  }
  
  // Add auth token
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Make the request
  let response = await fetch(url, {
    ...options,
    headers: Object.keys(headers).length ? headers : undefined,
  });

  // Handle 401 - token refresh and retry
  if (response.status === 401 && token) {
    try {
      const newToken = await refreshAccessToken();
      
      // Retry with new token
      response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          'Authorization': `Bearer ${newToken}`,
        },
      });
    } catch (refreshError) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      // window.location.href = '/login';
      throw new Error('Authentication failed');
    }
  }

  // Handle errors
  if (!response.ok) {
  const errorData = await response.json().catch(() => ({}));
    const message = extractFirstError(errorData) || `HTTP ${response.status}`;
    throw new Error(message);
  }

  // Handle 204 No Content (common for DELETE)
  if (response.status === 204 || response.status === 205) {
    return undefined as T;
  }

  return response.json();
};

/**
 * Convenience API methods - clean interface for the components
 */
export const api = {
  get: <T = any>(endpoint: string): Promise<T> => 
    apiClient<T>(endpoint, { method: 'GET' }),
  
  post: <T = any, R = any>(endpoint: string, data: R): Promise<T> => 
    apiClient<T>(endpoint, {
      method: 'POST',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  
  put: <T = any, R = any>(endpoint: string, data: R): Promise<T> => 
    apiClient<T>(endpoint, {
      method: 'PUT',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  
  patch: <T = any, R = any>(endpoint: string, data: R): Promise<T> => 
    apiClient<T>(endpoint, {
      method: 'PATCH',
      body: data instanceof FormData ? data : JSON.stringify(data),
    }),
  
  delete: <T = any>(endpoint: string): Promise<T> => 
    apiClient<T>(endpoint, { method: 'DELETE' }),
};
