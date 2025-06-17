import React from 'react';
import PetList from '../components/PetList';
const Pets: React.FC = () =>{
    return (
    <div>
        <div>
            <h2>My Pets</h2>
        </div>
        <div>
           <PetList />
        </div>
        

    </div>
    )
};



export default Pets