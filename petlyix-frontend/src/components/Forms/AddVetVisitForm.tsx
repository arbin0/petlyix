import { Button, Flex, Textarea, Select } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useQuery } from '@tanstack/react-query';
import { petsApi } from '../../api/pets';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { IconCheck, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useState } from 'react';
import { type Vet } from '../../types/api';
import { formatISO } from 'date-fns';

export const AddVetVisitForm = ({ closeModal }: { closeModal: () => void }) => {
  const { petId } = useParams();
  const queryClient = useQueryClient();
  const { data: vets = [] } = useQuery<Vet[]>({
    queryKey: ['vets', petId],
    queryFn: () => petsApi.getVets(petId!),
    enabled: !!petId,
  });

  const [visitDate, setVisitDate] = useState<string | null>(formatISO(new Date()));
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  const form = useForm({
    initialValues: { vet: '', reason: '', notes: '' },
    validate: { vet: (v) => (!v ? 'Vet is required' : null) },
  });

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          const formData = new FormData();
          formData.append('pet', petId!);
          formData.append('vet', values.vet);
          formData.append('reason', values.reason);
          formData.append('notes', values.notes);
          if (visitDate) formData.append('visit_date', visitDate);

          await petsApi.createVetVisit(formData);
          queryClient.invalidateQueries({ queryKey: ['vetVisits', petId] });
          closeModal();

          notifications.show({
            title: 'Vet Visit Added',
            message: 'Vet visit recorded.',
            color: 'teal',
            icon: checkIcon,
          });

          form.reset();
          setVisitDate(formatISO(new Date()));
        } catch (error) {
          notifications.show({
            title: 'Error',
            message: 'Could not save visit.',
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

      <Textarea label="Reason" {...form.getInputProps('reason')} />
      <Textarea label="Notes" {...form.getInputProps('notes')} />

      <DateTimePicker
        label="Visit Date"
        value={visitDate ? new Date(visitDate) : null}
        onChange={(date) => setVisitDate(date ? formatISO(date) : null)}
        clearable
      />

      <Flex justify="flex-end" mt="md">
        <Button type="submit">Save</Button>
      </Flex>
    </form>
  );
};
