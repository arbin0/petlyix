import { api } from './client';
import  { type Pet, type FoodLog, type Vet, type VetVisit, type PetHealth, type Appointment } from '../types/api';

export const petsApi = {
  // Pet CRUD operations
  getAllPets: (): Promise<Pet[]> => 
    api.get<Pet[]>('/pets/'),
  
  getPet: (id: string): Promise<Pet> => 
    api.get<Pet>(`/pets/${id}/`),
  
  createPet: (petData: Partial<Pet> | FormData): Promise<Pet> => 
    api.post<Pet, Partial<Pet> | FormData>('/pets/', petData),
  
  updatePet: (id: string, petData: Partial<Pet> | FormData): Promise<Pet> => 
    api.put<Pet, Partial<Pet> | FormData>(`/pets/${id}/`, petData),
  
  deletePet: (id: string): Promise<void> => 
    api.delete<void>(`/pets/${id}/`),
  
  // Food log operations
  getFoodLogs: (petId: string): Promise<FoodLog[]> => 
    api.get<FoodLog[]>(`/foodlogs/?petId=${petId}`,),
  
  createFoodLog: (logData: Partial<FoodLog> | FormData): Promise<FoodLog> => 
    api.post<FoodLog, Partial<FoodLog>| FormData>(`/foodlogs/`, logData),

  createVets: (vetData: Partial<Vet> | FormData): Promise<Vet> => 
    api.post<Vet, Partial<Vet>| FormData>(`/vets/`, vetData),

  getVets: (petId: string): Promise<Vet[]> =>
    api.get<Vet[]>(`/vets?petId=${petId}`,),

    // VetVisit operations
  getVetVisits: (petId: string): Promise<VetVisit[]> =>
    api.get<VetVisit[]>(`/vetvisits/?petId=${petId}`),

  createVetVisit: (visitData: Partial<VetVisit> | FormData): Promise<VetVisit> =>
    api.post<VetVisit, Partial<VetVisit> | FormData>(`/vetvisits/`, visitData),

  // PetHealth operations
  getPetHealth: (petId: string): Promise<PetHealth[]> =>
    api.get<PetHealth[]>(`/pethealth/?petId=${petId}`),

  createPetHealth: (healthData: Partial<PetHealth> | FormData): Promise<PetHealth> =>
    api.post<PetHealth, Partial<PetHealth> | FormData>(`/pethealth/`, healthData),

  // Appointment operations
  getAppointments: (petId: string): Promise<Appointment[]> =>
    api.get<Appointment[]>(`/appointments/?petId=${petId}`),

  createAppointment: (apptData: Partial<Appointment> | FormData): Promise<Appointment> =>
    api.post<Appointment, Partial<Appointment> | FormData>(`/appointments/`, apptData),

  updateAppointment: (id: string, petId: string, apptData: Partial<Appointment> | FormData): Promise<Appointment> =>
  api.patch<Appointment, Partial<Appointment> | FormData>(`/appointments/${id}/?petId=${petId}`, apptData),


};
