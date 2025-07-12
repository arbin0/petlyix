import { useQuery } from '@tanstack/react-query';
import { fetchPetData, type Pet } from '../services/fetchPetData';
import { Link } from 'react-router-dom';
import { Button, Loader, Grid } from '@mantine/core';
import { CardDisplay } from './CardDisplay';


const baseMediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;
const PetList = () => {
const { data: pets = [], error, isLoading, refetch } = useQuery<Pet[]>({
    queryKey: ['pets'],
    queryFn: () => fetchPetData<Pet[]>('/pets/'),

});
if (isLoading) return <p><Loader color="gray" type="dots" />;</p>
if (error) return <p>❌ Error: {(error as Error).message}</p>
    return(     
         <div>
            
            {/* <Button onClick={() => refetch} variant="light" color="violet">Refresh</Button> */}
            {/* Creating Grid Layout using Grid mantine component, span 6 = 2 items per row, one item = 12 span so 6 is 12/6 = 50% space */}
            <Grid>
                {pets.map((pet)=>(
                    <Grid.Col span= {4} key = {pet.id}>
                        
                        <Link to= {`/pets/${pet.id}`} style={{ textDecoration: 'none' }}>
                        {/* {pet.name} the {pet.type} */}
                        
                        <CardDisplay 
                        // Checks if the photo field is null or not and if null displays default avatar image depending upon the pet type
                        img_url={pet.photo ? `${pet.photo}` : `${baseMediaUrl}/pet_photos/${pet.type.toLowerCase()}.png`} 
                        name={pet.name} type={pet.type}  
                        />
                        </Link>
                         
                    </Grid.Col>
                          
                ))}

            </Grid>
        </div>
    );
};

export default PetList;