import { Button, Flex, Select } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { petsApi } from '../../api/pets';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { IconCheck, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { formatISO } from 'date-fns';
import { type Vet } from '../../types/api';

export const AddAppointmentForm = ({ closeModal }: { closeModal: () => void }) => {
  const { petId } = useParams();
  const queryClient = useQueryClient();
  const { data: vets = [] } = useQuery<Vet[]>({
    queryKey: ['vets', petId],
    queryFn: () => petsApi.getVets(petId!),
    enabled: !!petId,
  });

  const [appointmentDate, setAppointmentDate] = useState<string | null>(null);
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  const form = useForm({
    initialValues: { vet: '', status: 'scheduled' },
    validate: { vet: (v) => (!v ? 'Vet is required' : null) },
  });

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          const formData = new FormData();
          formData.append('pet', petId!);
          formData.append('vet', values.vet);
          formData.append('status', values.status);
          if (appointmentDate) formData.append('appointment_date', appointmentDate);

          await petsApi.createAppointment(formData);
          queryClient.invalidateQueries({ queryKey: ['appointments', petId] });
          closeModal();

          notifications.show({
            title: 'Appointment Added',
            message: 'Appointment scheduled.',
            color: 'teal',
            icon: checkIcon,
          });
          form.reset();
          setAppointmentDate(null);
        } catch (error) {
          notifications.show({
            title: 'Error',
            message: 'Could not schedule appointment.',
            color: 'red',
            icon: xIcon,
          });
        }
      })}
    >
      <Select
        label="Select Vet"
        placeholder="Pick a vet"
        data={vets.map((v) => ({ value: v.id, label: v.name }))}
        {...form.getInputProps('vet')}
        withAsterisk
      />

      <Select
        label="Status"
        data={[
          { value: 'scheduled', label: 'Scheduled' },
          { value: 'cancelled', label: 'Cancelled' },
          { value: 'completed', label: 'Completed' },
          { value: 'no_show', label: 'No Show' },
        ]}
        {...form.getInputProps('status')}
      />

      <DateTimePicker
        label="Appointment Date"
        value={appointmentDate ? new Date(appointmentDate) : null}
        onChange={(date) => setAppointmentDate(date ? formatISO(date) : null)}
        clearable
      />

      <Flex justify="flex-end" mt="md">
        <Button type="submit">Save</Button>
      </Flex>
    </form>
  );
};
