import { PetFoodLogTable } from '../components/PetFoodLogTable';

import { DeletePetModal } from '../components/Modals/DeletePetModal';
import { Flex } from '@mantine/core';
const PetFeeding = () =>{
    return (
    <div>
        <div>
            <Flex justify={"space-between"}>
                Move delete in manage Pet PAge<DeletePetModal/>
            </Flex>
            
        </div>
      
        <div>
            <PetFoodLogTable />
        </div>

    </div>
    )
};



export default PetFeeding;