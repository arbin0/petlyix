const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const postData = async <T, R>(
  endpoint: string,
  data: R,
  
): Promise<T> => {
  //Checking if the data passed is Form Data because if FormData we need to pass raw data and no header info
  const isFormData = data instanceof FormData; 
  const headers : Record <string, string> ={};
  const token = localStorage.getItem("accessToken");

   if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',
    headers: Object.keys(headers).length ? headers : undefined, 
  
  body: isFormData ? data : JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.log(errorData)
    throw errorData;
  }

  return response.json();
  
};

