import { useState } from "react";
import { Modal, Button, Select, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { DateTimePicker } from "@mantine/dates";
import { notifications } from "@mantine/notifications";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { petsApi } from "../../api/pets";
import { type Appointment, type Vet } from "../../types/api";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
interface EditAppointmentModalProps {
  appointment: Appointment;
}

export const EditAppointmentModal = ({ appointment }: EditAppointmentModalProps) => {
  const [opened, setOpened] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState<string | null>(appointment.appointment_date);
  const queryClient = useQueryClient();
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;
  const {petId} = useParams();
  // fetch vets for Select
  const { data: vets = [] } = useQuery<Vet[]>({
    queryKey: ["vets", appointment.pet],
    queryFn: () => petsApi.getVets(appointment.pet),
    enabled: !!appointment.pet,
  });

  const form = useForm({
    initialValues: {
      vet: appointment.vet,
      status: appointment.status,
    },
    validate: {
      vet: (v) => (!v ? "Vet is required" : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    try {
      const formData = new FormData();
      formData.append("vet", values.vet);
      formData.append("status", values.status);
      formData.append('pet', petId!);
      if (appointmentDate) formData.append("appointment_date", appointmentDate);

      await petsApi.updateAppointment(appointment.id, petId!, formData);
      queryClient.invalidateQueries({ queryKey: ["appointments", appointment.pet] });
      setOpened(false);

      notifications.show({
        title: "Appointment Updated",
        message: "Appointment details updated successfully.",
        color: "teal",
        icon: checkIcon,
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Could not update appointment.",
        color: "red",
        icon: xIcon,
      });
    }
  };

  return (
    <>
      <Button size="xs" onClick={() => setOpened(true)} variant="filled" color="teal">
        Edit
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Edit Appointment"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            label="Select Vet"
            placeholder="Pick a vet"
            data={vets.map((v) => ({ value: v.id, label: v.name }))}
            {...form.getInputProps("vet")}
            withAsterisk
          />

          <Select
            label="Status"
            data={[
              { value: "scheduled", label: "Scheduled" },
              { value: "cancelled", label: "Cancelled" },
              { value: "completed", label: "Completed" },
              { value: "no_show", label: "No Show" },
            ]}
            {...form.getInputProps("status")}
          />

          <DateTimePicker
            label="Appointment Date"
            value={appointmentDate ? new Date(appointmentDate) : null}
            onChange={(date) => setAppointmentDate(date ? date.toString() : null)}
            clearable
          />

          <Flex justify="flex-end" mt="md">
            <Button type="submit">Save</Button>
          </Flex>
        </form>
      </Modal>
    </>
  );
};