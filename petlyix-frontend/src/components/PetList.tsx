// ===== Updated: src/components/PetList.tsx =====
import { useQuery } from '@tanstack/react-query';
import { petsApi } from '../api/pets';// Import from your new API
import { type Pet } from '../types/api';     // Import from centralized types
import { Link } from 'react-router-dom';
import { Button, Loader, Grid } from '@mantine/core';
import { CardDisplay } from './CardDisplay';

const baseMediaUrl = import.meta.env.VITE_MEDIA_BASE_URL;

const PetList = () => {
  // Updated to use the new petsApi
  const { data: pets = [], error, isLoading, refetch } = useQuery<Pet[]>({
    queryKey: ['pets'],
    queryFn: petsApi.getAllPets, // Replace fetchPetData with petsApi.getAllPets
  });

  if (isLoading) return <p><Loader color="gray" type="dots" /></p>;
  if (error) return <p>❌ Error: {(error as Error).message}</p>;

  return (    
    <div>
      {/* Uncomment this if you want a refresh button */}
      {/* <Button onClick={() => refetch()} variant="light" color="violet">Refresh</Button> */}
      
      {/* Creating Grid Layout using Grid mantine component, span 4 = 3 items per row */}
      <Grid>
        {pets.map((pet) => (
          <Grid.Col span={4} key={pet.id}>
            <Link to={`/pets/${pet.id}`} style={{ textDecoration: 'none' }}>
              <CardDisplay
                // Checks if the photo field is null or not and if null displays default avatar image depending upon the pet type
                img_url={pet.photo ? `${pet.photo}` : `${baseMediaUrl}/pet_photos/${pet.type.toLowerCase()}.png`}
                name={pet.name} 
                type={pet.type}  
              />
            </Link>
          </Grid.Col>
        ))}
      </Grid>
    </div>
  );
};

export default PetList;