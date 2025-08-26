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
  calories: number;
  logged_time: string;
  petId: string;
}

export interface Vet {
  id: string, 
  name: string,
  phone: string,
  email: string,
  main_doctor: string,
  address_line1: string,
  city : string,
  state: string,
  postal_code: string,
  country: string,
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