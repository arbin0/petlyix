import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { type FoodLog } from "../types/api";
import { petsApi } from "../api/pets";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export const PetOverviewData = () => {
   
    const { petId } = useParams();
    const { data: foodData = [] } = useQuery<FoodLog[]>({
           queryKey: ['foods', petId],
           queryFn: () => petsApi.getFoodLogs(petId!),
           enabled: !!petId,
        });
    const firstLoggedTime = foodData && foodData.length > 0 ? foodData[0].logged_time : null;
    console.log(firstLoggedTime);
    const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    if (isToday(date)) {
        return `Today at ${format(date, "h:mm a")}`;
    }

    if (isYesterday(date)) {
        return `Yesterday at ${format(date, "h:mm a")}`;
    }


    // if it's within the last 7 days
    const daysAgo = Math.abs(
        Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    );
    if (daysAgo < 7) {
        return formatDistanceToNow(date, { addSuffix: true }); // e.g. "3 days ago"
    }

    // fallback for older dates
    return format(date, "MMM d, yyyy 'at' h:mm a");
    };

    const formattedDate = firstLoggedTime ? formatDate(firstLoggedTime) : "N/A";
    return(
        <div>
            <p> Last Eaten {formattedDate}</p>
        </div>
    ) 
    
}
