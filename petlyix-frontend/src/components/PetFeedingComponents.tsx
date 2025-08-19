import { petsApi } from "../api/pets";
import { type FoodLog } from "../types/api";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { PetFoodLogTable } from "./PetFoodLogTable";
import { CalorieChart } from "./Charts/CalorieChart";
import { LogFoodModal } from "./Modals/LogFoodModal";
import { Space } from "@mantine/core";

export const PetFeedingComponents = () => {

    const { petId } = useParams();
    const { data: foods = [] } = useQuery<FoodLog[]>({
       queryKey: ['foods', petId],
       queryFn: () => petsApi.getFoodLogs(petId!),
       enabled: !!petId,
    });


    return(
        <div>
        <LogFoodModal />
        <Space h="xs" />
        <CalorieChart foods = {foods} />
        <Space h="xl" />
        <PetFoodLogTable foods = {foods} />
        </div>

    )
}
