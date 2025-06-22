import React from 'react';
import PetDetails from '../components/PetDetails';

import { TableScrollArea } from '../components/TableScrollArea';
import { GoBack } from '../components/BackNavigation';
const PetDetailPage: React.FC = () =>{
    return (
    <div>
        <div>
            <GoBack />
        </div>
        <div>
           <PetDetails />
        </div>
        <div>
            <TableScrollArea />
        </div>

    </div>
    )
};



export default PetDetailPage;