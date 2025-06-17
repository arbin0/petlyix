const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const fetchPetData = async <T,>(endpoint: string): Promise<T> => {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) throw new Error('Failed to Fetch Pets');
    return response.json();
};