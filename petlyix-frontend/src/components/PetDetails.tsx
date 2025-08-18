import { useQuery } from "@tanstack/react-query";
import { petsApi } from "../api/pets";
import { type Pet } from "../types/api";
import { useParams } from 'react-router-dom';
import { Loader, Avatar, Group, Text } from '@mantine/core';


export const PetDetails: React.FC = () => {
    const baseMediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;
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
                     
        
     <Group wrap="nowrap">
        
        <Avatar
          src={pet?.photo ? `${pet?.photo}` : `${baseMediaUrl}/pet_photos/${pet?.type.toLowerCase()}.png`}
          size={94}
          radius="md"
        />
            <div>
            <Text fz="lg" fw={500}>
            {pet?.name}
          </Text>
       
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {pet?.type}
          </Text>
             <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            {pet?.breed}
          </Text>

          </div>
        </Group>
        </div>
       
    );
};
