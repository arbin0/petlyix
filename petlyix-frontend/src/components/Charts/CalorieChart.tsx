import { LineChart, DonutChart } from '@mantine/charts';
import { Flex } from '@mantine/core';
import { type FoodLog } from '../../types/api';
import { format } from "date-fns";

interface CalorieChartProps{
    foods: FoodLog[]
}

const COLORS = ["indigo", "green", "orange", "red", "blue", "pink"];

function detectRange(dates: string[]): "day" | "week" | "month" | "year" {
  if (dates.length === 0) return "day"; // default fallback
  
  const endDate = new Date(dates[0]);
  const startDate = new Date(dates[dates.length - 1]);

  const diffInMs = endDate.getTime() - startDate.getTime();
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays <= 1) return "day";
  if (diffInDays <= 7) return "week";
  if (diffInDays <= 30) return "month";
  return "year";
}

function aggregateFoodCount(foods: FoodLog[]) {
    
  const counts: Record<string, number> = {};

  foods.forEach(f => {
    counts[f.name] = (counts[f.name] || 0) + 1;
  });

  // assign a color to each unique food
  const names = Object.keys(counts);
  return names.map((name, index) => ({
    name,
    value: counts[name],
    color: COLORS[index % COLORS.length], // rotate colors if more foods than colors
  }));
}

export const CalorieChart = ({foods}: CalorieChartProps) => {
    const dates = foods.map(f => f.logged_time);
    const range = detectRange(dates);
    
    const chartData = foods.slice() // copy array so original is not mutated
    .sort((a, b) => new Date(a.logged_time).getTime() - new Date(b.logged_time).getTime())
    .map(f => {
    const date = new Date(f.logged_time);
    let formattedDate = "";

    switch (range) {
      case "day":
        formattedDate = format(date, "EEE h:mm a");
        break;
      case "week":
        formattedDate = format(date, "EEE MMM d h a");
        break;
      case "month":
        formattedDate = format(date, "MMM d");
        break;
      case "year":
        formattedDate = format(date, "MMM yyyy");
        break;
      default:
        formattedDate = format(date, "MMM d, yyyy h:mm a");
    }

    return {
      ...f,
      logged_time_formatted: formattedDate, // new property for chart
    };
  });

    if (foods.length < 1){
        return null
    }
    return(
        <Flex justify={"space-around"}>
            <LineChart 
            h = {300}
            w = {700}
            data = {chartData}
            dataKey = "logged_time_formatted"
            series ={[{ name: 'calories', color: 'indigo.6' },]}
            withLegend
            curveType="linear"
            />
            <DonutChart
            data={aggregateFoodCount(foods)}
            size={250}
            chartLabel={"Food Frequency Distribution"}
            withLabelsLine 
            labelsType="percent"
            />
        </Flex>
        
    )
}
