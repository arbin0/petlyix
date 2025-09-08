import { Button, Flex, NumberInput, Textarea } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { petsApi } from '../../api/pets';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';

interface AddPetHealthFormProps {
  closeModal: () => void;
}

export const AddPetHealthForm = ({ closeModal }: AddPetHealthFormProps) => {
  const { petId } = useParams();
  const queryClient = useQueryClient();

  const now = new Date();
  const formatted = format(now, 'yyyy-MM-dd HH:mm');
  const [isTimeNow, setIsTimeNow] = useState(false);
  const [recordTime, setRecordTime] = useState<string | null>(formatted);

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  const form = useForm({
    initialValues: {
      weight: '' as number | '',
      height: '' as number | '',
      medical_conditions: '',
      vaccinations: '',
      notes: '',
    },
    validate: {
      weight: (value) => (value !== '' && value <= 0 ? 'Weight must be positive' : null),
      height: (value) => (value !== '' && value <= 0 ? 'Height must be positive' : null),
    },
  });

  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        try {
          const formData = new FormData();
          formData.append('pet', petId!);
          formData.append('weight', String(values.weight));
          if (values.height !== '') formData.append('height', String(values.height));
          formData.append('medical_conditions', values.medical_conditions);
          formData.append('vaccinations', values.vaccinations);
          formData.append('notes', values.notes);
          formData.append('record_date', recordTime!);

          await petsApi.createPetHealth(formData);
          queryClient.invalidateQueries({ queryKey: ['petHealth', petId] });
          closeModal();

          notifications.show({ title: 'Health Record Added', message: 'Pet health record created.', color: 'teal', icon: checkIcon });
          form.reset();
        } catch (error) {
          notifications.show({ title: 'Error', message: 'Could not save health record.', color: 'red', icon: xIcon });
        }
      })}
    >
      <NumberInput label="Weight" {...form.getInputProps('weight')} withAsterisk />
      <NumberInput label="Height" {...form.getInputProps('height')} />
      <Textarea label="Medical Conditions" {...form.getInputProps('medical_conditions')} />
      <Textarea label="Vaccinations" {...form.getInputProps('vaccinations')} />
      <Textarea label="Notes" {...form.getInputProps('notes')} />

      {isTimeNow ? (
        <>
          <DateTimePicker
            label="Record Date"
            placeholder="Pick date/time"
            value={recordTime ? new Date(recordTime) : null}
            onChange={(d) => setRecordTime(d ? format(d, 'yyyy-MM-dd HH:mm') : null)}
            clearable
          />
          <Button onClick={() => setIsTimeNow(false)} mt="sm">
            Set Now
          </Button>
        </>
      ) : (
        <Flex gap="sm" mt="sm">
          <Button onClick={() => setRecordTime(formatted)}>Now</Button>
          <Button onClick={() => setIsTimeNow(true)}>Other Time</Button>
        </Flex>
      )}

      <Flex justify="flex-end" mt="md">
        <Button type="submit">Save</Button>
      </Flex>
    </form>
  );
};
