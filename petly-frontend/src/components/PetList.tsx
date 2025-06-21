import { useQuery } from '@tanstack/react-query';
import { fetchPetData, type Pet } from '../services/fetchPetData';
import { Link } from 'react-router-dom';
import { Button, Loader } from '@mantine/core';

const PetList: React.FC = () => {
const { data: pets = [], error, isLoading, refetch } = useQuery<Pet[]>({
    queryKey: ['pets'],
    queryFn: () => fetchPetData<Pet[]>('/pets/'),

});
if (isLoading) return <p><Loader color="blue" />;</p>
if (error) return <p>❌ Error: {(error as Error).message}</p>
    return(
        <div>
            <h2>Pets</h2>
            <Button onClick={() => refetch} variant="light" color="violet">Refresh</Button>
            <ul>
                {pets.map((pet)=>(
                    <li key = {pet.id}>
                        <Link to= {`/pets/${pet.id}`}>{pet.name} the {pet.type}</Link>
                         
                    </li>
                          
                ))}
            </ul>
        </div>
    );
};

export default PetList;