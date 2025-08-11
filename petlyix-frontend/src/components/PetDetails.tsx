import { useQuery } from "@tanstack/react-query";
import { petsApi } from "../api/pets";
import { type Pet } from "../types/api";
import { useParams } from 'react-router-dom';
import { Loader } from '@mantine/core';

export const PetDetails: React.FC = () => {
    const { petId } = useParams();
    
    const { data: pet, error, isLoading } = useQuery<Pet>({
        queryKey: ['pet', petId],
        queryFn: () => petsApi.getPet(petId!),
        enabled: !!petId,
    });

    if (isLoading) return <p><Loader color="blue"/></p>;
    if (error) return <p>Error: {(error as Error).message}</p>;

    return (
        <div>
            <p>{pet?.name}</p>
            <p>Type: {pet?.type}</p>
            <p>Breed: {pet?.breed}</p>
        </div>
    );
};
