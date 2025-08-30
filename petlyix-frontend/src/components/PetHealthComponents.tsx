import { petsApi } from "../api/pets";
import { type Vet } from "../types/api";
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { PetVetDetails } from "./PetVetDetails";
import { AddVetModal } from "./Modals/AddVetModal";
import { Space } from "@mantine/core";

export const PetHealthComponents = () => {

    const { petId } = useParams();
    const { data: vets = [] } = useQuery<Vet[]>({
       queryKey: ['vets', petId],
       queryFn: () => petsApi.getVets(petId!),
       enabled: !!petId,
    });


    return(
        <div>
        <AddVetModal />
        <Space h="xs" />
        <PetVetDetails vets = {vets} />
        </div>

    )
}
