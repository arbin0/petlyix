import PetDetails from '../components/PetDetails';

import { PetDetailsTable } from '../components/petDetailsTable';
import { GoBack } from '../components/BackNavigation';
import { DeletePetModal } from '../components/deletePetModal';
import { Flex } from '@mantine/core';
const PetDetailPage = () =>{
    return (
    <div>
        <div>
            <Flex justify={"space-between"}>
                <GoBack />
                <DeletePetModal/>
            </Flex>
            
        </div>
        <div>
           <PetDetails />
        </div>
        <div>
            <PetDetailsTable />
        </div>

    </div>
    )
};



export default PetDetailPage;