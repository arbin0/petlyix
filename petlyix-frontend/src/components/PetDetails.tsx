import { useQuery } from "@tanstack/react-query";
import { fetchPetData, type Pet } from "../services/fetchPetData";
import { useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';

export const PetDetails: React.FC = () => {
    const { petId } = useParams();
    
    const { data:pet, error, isLoading } = useQuery<Pet>({
        queryKey: ['pet', petId],
        queryFn: () => fetchPetData<Pet>(`/pets/${petId}`),
        enabled: !!petId,  // only run query if id is defined

    });
if (isLoading) return <p><Loader color="blue"/></p>
if (error) return <p>Error:{(error as Error).message}</p>
return(
    <div>
        <p>{pet?.name}</p>
        <p>Type: {pet?.type}</p>
        <p>Breed: {pet?.breed}</p>
    </div>
);

};



