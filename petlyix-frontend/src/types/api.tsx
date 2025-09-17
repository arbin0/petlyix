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
  id: string;
  name: string;
  phone: string;
  email: string;
  main_doctor: string;
  address_line1: string;
  address_line2?: string;
  city : string;
  state: string;
  postal_code: string;
  country: string;
  pets?: string[];
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



export interface VetVisit {
  id: string;
  pet: string; // Pet ID
  vet: string; // Vet ID
  vet_name: string;
  visit_date: string; // ISO date string
  reason?: string;
  notes?: string;
  created_at: string;
}

// Appointment
export interface Appointment {
  id: string;
  vet_name: string;
  pet: string; // Pet ID
  vet: string; // Vet ID
  appointment_date: string; // ISO date string
  status: "scheduled" | "cancelled" | "completed" | "no_show";
  reminder_sent: boolean;
  created_at: string;
}

// PetHealth
export interface PetHealth {
  id: string;
  pet: string; // Pet ID
  weight: number;
  height?: number;
  medical_conditions?: string;
  vaccinations?: string;
  notes?: string;
  record_date: string; // ISO date string
  created_at: string;
}