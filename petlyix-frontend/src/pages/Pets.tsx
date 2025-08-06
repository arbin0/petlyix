
import PetList from '../components/PetList';
import { AddPetModal } from '../components/Modals/AddPetModal';
import { Flex,Space } from '@mantine/core';

const Pets  = () =>{
    return (
       
    <div>
       
        <Flex justify="flex-end" align="center" >
                 
         <AddPetModal/> 

        </Flex>

        <Space h="xl" />
                  
        <div>
           <PetList />
        </div>
        

    </div>
    )
};



export default Pets