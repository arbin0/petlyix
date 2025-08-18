import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { type FoodLog } from "../types/api";
import { petsApi } from "../api/pets";


export const PetOverviewData = () => {
    const { petId } = useParams();
    const { data: foodData = [] } = useQuery<FoodLog[]>({
           queryKey: ['foods', petId],
           queryFn: () => petsApi.getFoodLogs(petId!),
           enabled: !!petId,
        });
    const firstLoggedTime = foodData && foodData.length > 0 ? foodData[0].logged_time : null;
    console.log(firstLoggedTime);


    return(
        <div>
            <p> Last Eaten at {firstLoggedTime} : Format with date-fsn</p>
        </div>
    ) 
    
}
