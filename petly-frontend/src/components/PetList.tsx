import React, { useEffect, useState } from 'react';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
import { useQuery } from '@tanstack/react-query';

const fetchPets = async() => {
    const response = await fetch(`${baseUrl}/pets/`);
    if (!response.ok) throw new Error('Failed to Fetch Pets');
    return response.json();
};

const PetList: React.FC = () => {
const { data: pets, error, isLoading, refetch } = useQuery({
    queryKey: ['pets'],
    queryFn: fetchPets,

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