import React from 'react';
import PetDetails from '../components/PetDetails';
import FoodList from '../components/FoodList';
const PetDetailPage: React.FC = () =>{
    return (
    <div>
        <div>
           <PetDetails />
        </div>
        <div>
            <FoodList />
        </div>
        

    </div>
    )
};



export default PetDetailPage;