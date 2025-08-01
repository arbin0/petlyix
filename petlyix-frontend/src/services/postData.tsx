const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const postData = async <T, R>(
  endpoint: string,
  data: R
): Promise<T> => {
  //Checking if the data passed is Form Data because if FormData we need to pass raw data and no header info
  const isFormData = data instanceof FormData; 
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'POST',

  headers: isFormData ? undefined : { 'Content-Type': 'application/json' },
  body: isFormData ? data : JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to post data');
  }

  return response.json();
};

