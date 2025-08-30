
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
           <h4>{vet.name}</h4>
          </Grid.Col>
        ))}
      </Grid>
      </div>
    );

}