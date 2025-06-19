import { useQuery } from '@tanstack/react-query';
import { fetchPetData, type Pet } from '../services/fetchPetData';
import { Link } from 'react-router-dom';


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