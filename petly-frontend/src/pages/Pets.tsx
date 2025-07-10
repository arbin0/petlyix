
import PetList from '../components/PetList';
import { AddPetModal } from '../components/AddPetModal';
import { Flex } from '@mantine/core';

const Pets  = () =>{
    return (
       
    <div>
       
        <Flex justify="space-between">
        
         <h2>My Pets</h2> 
         <AddPetModal/> 

        </Flex>

        
                  
        <div>
           <PetList />
        </div>
        

    </div>
    )
};



export default Pets