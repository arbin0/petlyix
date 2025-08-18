import { DeletePetModal } from '../components/Modals/DeletePetModal';
import { Flex } from '@mantine/core';
const PetManage = () => {

    return (
        <div>
        
        <h2>Manage My Pet</h2>
        <Flex justify={"space-between"}>
               <DeletePetModal/>
            </Flex>
        
        </div>
    )

};

export default PetManage;
