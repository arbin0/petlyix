import React, { useEffect, useState } from 'react';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
interface Pet {
    id: string;
    name: string;
    type:string;
    breed: string;
}

const PetList: React.FC = () => {
    const [pets, setPets] = useState<Pet[]>([]);

    useEffect(() =>{
        fetch(`${baseUrl}/pets/`)
        .then((res) => res.json())
        .then((data) => setPets(data))
        .catch((err) => console.error ('Failed to Fetch Pets:', err));
    }, []);

    return(
        <div>
            <h2>
                <ul>
                    {pets.map((pet)=>(
                        <li key ={pet.id}>
                            {pet.name} ({pet.type})
                        </li>
                    ))}
                </ul>
            </h2>
        </div>
    );
};

export default PetList;