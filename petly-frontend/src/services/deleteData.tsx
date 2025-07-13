const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const deleteData = async <T,>(
  endpoint: string,
  
): Promise<T | void> => {
  //Checking if the data passed is Form Data because if FormData we need to pass raw data and no header info
  
  const response = await fetch(`${baseUrl}${endpoint}`, {
    method: 'DELETE',
  
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to Delete data');
  }
  if (response.status === 204) {
    return; // no content to parse, returns undefined
  }

  return response.json();
};

