import { api } from './client';
import  { type Pet, type FoodLog } from '../types/api';

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
    api.get<FoodLog[]>(`/pets/${petId}/food-logs/`),
  
  createFoodLog: (petId: string, logData: Partial<FoodLog>): Promise<FoodLog> => 
    api.post<FoodLog, Partial<FoodLog>>(`/pets/${petId}/food-logs/`, logData),
};
