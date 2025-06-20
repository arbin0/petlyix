import { useQuery } from "@tanstack/react-query";
import { fetchPetData , type FoodLog} from "../services/fetchPetData";
import { useParams } from "react-router-dom";


const FoodList: React.FC = () => {
    const { petId } = useParams();
    const { data: foods = [], error, isLoading, refetch } = useQuery<FoodLog[]>({
       queryKey: ['foods', petId],
       queryFn: () => fetchPetData<FoodLog[]>(`/foodlogs/?petId=${petId}`), 
    });

    if(isLoading) return <p>Loading Foods.....</p>
    if(error) return <p>Error Fetching Data</p>

    return (
        <div>
            <button onClick={() => refetch}>🔄 Refresh</button>
            <table>
                <tr>
                <th>
                    Food Name
                </th>
                <th>
                    Calories
                </th>
                <th>
                    Meal Time
                </th>

                </tr>
                {foods.map((food)=> (
                    <tr key={food.id}>
                        <td>{food.name}</td><td>{food.calories}</td> <td>{new Date(food.logged_time).toLocaleString()}</td>

                    </tr>
                
                ))}
             
            </table>
        </div>
    );
};

export default FoodList;