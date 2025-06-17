import { useQuery } from '@tanstack/react-query';
import { fetchPetData } from '../services/fetchPetData';

interface Pet {
  id: string;
  name: string;
  type: string;
}


const PetList: React.FC = () => {
const { data: pets = [], error, isLoading, refetch } = useQuery<Pet[]>({
    queryKey: ['pets'],
    queryFn: () => fetchPetData<Pet[]>('/pets/'),

});
if (isLoading) return <p>Loading Pets...</p>
if (error) return <p>❌ Error: {(error as Error).message}</p>
    return(
        <div>
            <h2>Pets</h2>
            <button onClick={() => refetch()}>🔄 Refresh</button>
            <ul>
                {pets.map((pet: any)=>(
                    <li key = {pet.id}>
                        {pet.name} the {pet.type} 
                    </li>
                          
                ))}
            </ul>
        </div>
    );
};

export default PetList;