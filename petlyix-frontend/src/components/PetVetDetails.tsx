
import { type Vet } from "../types/api";
import { Grid } from "@mantine/core";

interface PetVetDetailsProps{
    vets: Vet[];
}

export const PetVetDetails  = ({vets}: PetVetDetailsProps) =>{
    console.log(vets);

    return(
      <div>

      
      <h2>Vets Associated with the pets</h2>
        <Grid>
        {vets.map((vet) => (
          <Grid.Col span={4} key={vet.id}>
           <h4>Vet Name: {vet.name}</h4>
           <p>Main Doctor: Dr. {vet.main_doctor}</p>
           <p>Phone:{vet.phone}</p>
           <p>Email:{vet.email}</p>
           Location: {vet.address_line1} {vet.address_line2} {vet.city} {vet.state} {vet.postal_code}
          </Grid.Col>
        ))}
      </Grid>
      </div>
    );

}