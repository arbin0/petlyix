import { OpenModal } from "./OpenModal";
import { AddPetForm } from "./Forms/AddPetForm";

export const AddPetModal = () => {
return(
<OpenModal title="Add New Pets" buttonLabel = "Add New Pet">
<AddPetForm/>
</OpenModal>
);
}
