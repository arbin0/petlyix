import { useQuery } from "@tanstack/react-query";
import { fetchPetData, type Pet } from "../services/fetchPetData";
import { useParams } from 'react-router-dom';

const PetDetails: React.FC = () => {
    const { petId } = useParams();
    const { data:pet, error, isLoading } = useQuery<Pet>({
        queryKey: ['pet', petId],
        queryFn: () => fetchPetData<Pet>(`/pets/${petId}`),
        enabled: !!petId,  // only run query if id is defined

    });
if (isLoading) return <p>Loading...</p>
if (error) return <p>Error:{(error as Error).message}</p>
return(
    <div>
        <h2>{pet?.name}</h2>
        <p>{pet?.type}</p>
        <p>{pet?.breed}</p>
    </div>
);

};

export default PetDetails;


