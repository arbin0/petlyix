const baseUrl = import.meta.env.VITE_API_BASE_URL;

export interface Pet {
  id: string;
  name: string;
  type: string;  
  breed: string;
  dob: string;
  photo: string;
}

export interface FoodLog {
  id: string;
  name: string;
  calories: string;
  logged_time: string;
  petId: string;
}


export const fetchPetData = async <T,>(endpoint: string): Promise<T> => {
    const response = await fetch(`${baseUrl}${endpoint}`);
    if (!response.ok) throw new Error('Failed to Fetch Pets');
    return response.json();
};

