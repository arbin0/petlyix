import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { petsApi } from "../api/pets";
import {
  type FoodLog,
  type PetHealth,
  type VetVisit,
  type Appointment,
} from "../types/api";
import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
} from "date-fns";
import { Text, Paper } from "@mantine/core";
import classes from "../styles/overViewGroup.module.css";

export const PetOverviewData = () => {
  const { petId } = useParams();

  // Food Logs
  const { data: foodData = [] } = useQuery<FoodLog[]>({
    queryKey: ["foods", petId],
    queryFn: () => petsApi.getFoodLogs(petId!),
    enabled: !!petId,
  });

  // Latest Pet Health
  const { data: healthData = [] } = useQuery<PetHealth[]>({
    queryKey: ["petHealth", petId],
    queryFn: () => petsApi.getPetHealth(petId!),
    enabled: !!petId,
  });

  // Vet Visits
  const { data: vetVisits = [] } = useQuery<VetVisit[]>({
    queryKey: ["vetVisits", petId],
    queryFn: () => petsApi.getVetVisits(petId!),
    enabled: !!petId,
  });

  // Appointments
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ["appointments", petId],
    queryFn: () => petsApi.getAppointments(petId!),
    enabled: !!petId,
  });

  const formatDate = (dateString: string | null | undefined) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);

    if (isToday(date)) return `Today at ${format(date, "h:mm a")}`;
    if (isYesterday(date)) return `Yesterday at ${format(date, "h:mm a")}`;

    const daysAgo = Math.abs(
      Math.floor(
        (new Date().getTime() - date.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    );
    if (daysAgo < 7) return formatDistanceToNow(date, { addSuffix: true });

    return format(date, "MMM d, yyyy 'at' h:mm a");
  };

  // Last eaten
  const lastFood =
    foodData.length > 0 ? formatDate(foodData[0].logged_time) : "N/A";

  // Latest Health Record
  const latestHealth = healthData.length > 0 ? healthData[0] : null;

  // Last Vet Visit
  const lastVisit =
    vetVisits.length > 0 ? formatDate(vetVisits[0].visit_date) : "N/A";

  // Next Upcoming Scheduled Appointment
  const upcomingAppt = appointments
    .filter(
      (a) =>
        a.status === "scheduled" &&
        new Date(a.appointment_date) > new Date()
    )
    .sort(
      (a, b) =>
        new Date(a.appointment_date).getTime() -
        new Date(b.appointment_date).getTime()
    )[0];

  const data = [
    {
      title: "Last Eaten",
      stats: lastFood,
      description: "Most recent meal log recorded for your pet.",
    },
    {
      title: "Health Records",
      stats: latestHealth
        ? `Weight: ${latestHealth.weight}${
            latestHealth.height ? `, Height: ${latestHealth.height}` : ""
          }`
        : "No records",
      description: "Latest health check and medical details.",
    },
    {
      title: "Last Vet Visit",
      stats: lastVisit,
      description: "The most recent recorded veterinary visit.",
    },
    {
      title: "Upcoming Schedule",
      stats: upcomingAppt
        ? formatDate(upcomingAppt.appointment_date)
        : "None",
      description: "Next scheduled vet appointment.",
    },
  ];

  const stats = data.map((stat) => (
    <Paper
  key={stat.title}
  shadow="sm"
  p="lg"
  radius="md"
  withBorder
  className={classes.stat}
>
  <Text className={classes.title}>{stat.title}</Text>  {/* title here */}
  <Text className={classes.count}>{stat.stats}</Text>  {/* stats here */}
  <Text className={classes.description}>{stat.description}</Text>
</Paper>
  ));

  return <div className={classes.root}>{stats}</div>;
};
