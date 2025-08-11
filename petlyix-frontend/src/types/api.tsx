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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TokenResponse {
  tokens: {
    access: string;
    refresh: string;
  };
}