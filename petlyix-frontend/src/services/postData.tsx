// const baseUrl = import.meta.env.VITE_API_BASE_URL;

// export const postData = async <T, R>(
//   endpoint: string,
//   data: R,
//   retry = true // Prevent infinite loop
// ): Promise<T> => {
//   const isFormData = data instanceof FormData;
//   const headers: Record<string, string> = {};
//   const token = localStorage.getItem("accessToken");

//   if (!isFormData) {
//     headers["Content-Type"] = "application/json";
//   }

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   const response = await fetch(`${baseUrl}${endpoint}`, {
//     method: "POST",
//     headers: Object.keys(headers).length ? headers : undefined,
//     body: isFormData ? data : JSON.stringify(data),
//   });

//   if (!response.ok) {
//     // Token expired (401)
//     if (response.status === 401 && retry) {
//       console.warn("Access token expired. Refreshing token...");
      
//       // Try refreshing token
//       const newToken = await refreshToken();
//       if (newToken) {
//         localStorage.setItem("accessToken", newToken);
//         return postData<T, R>(endpoint, data, false); // Retry once
//       }
//     }

//     const errorData = await response.json();
//     throw errorData;
//   }

//   return response.json();
// };

// // Example refresh function
// async function refreshToken(): Promise<string | null> {
//   try {
//     const refreshToken = localStorage.getItem("refreshToken");
//     if (!refreshToken) return null;

//     const res = await fetch(`${baseUrl}/users/token/refresh`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (!res.ok) return null;
//     const data = await res.json();
//     return data.accessToken || null;
//   } catch {
//     return null;
//   }
// }
