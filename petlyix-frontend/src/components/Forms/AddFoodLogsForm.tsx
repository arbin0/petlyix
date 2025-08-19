import { Button, Group, TextInput, NumberInput, Flex } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { petsApi } from '../../api/pets'; // Import new API
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { format } from 'date-fns';

interface AddFoodLogFormProps {
  closeModal: () => void;
}

export const AddFoodLogForm = ({ closeModal }: AddFoodLogFormProps) => {
  const now = new Date();
  const formatted = format(now, 'yyyy  MMM d,  h:mm a');
  const [isTimeNow, setIsTimeNow] = useState(false);
  const [logTime, setLogTime] = useState<string | null>(null);
  const { petId } = useParams();
  const queryClient = useQueryClient();
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;


  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      calories: '' as number | '',
      logged_time: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name too short' : null),
      calories: (value) =>
      value !== '' && value <= 0 ? 'Calories must be greater than 0' : null,
    },
  });

  return (
    <form onSubmit={form.onSubmit(async (values) => {
      try {
        
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('calories', values.calories !== '' ? String(values.calories) : '');
        formData.append('logged_time', values.logged_time);
        formData.append('petId', petId!);
        
        
        // ✨ NEW: Use the unified API instead of postData
        const response = await petsApi.createFoodLog(formData);
        console.log('Food Logged:', response);
        
        // Refetch pets list after success (same as before)
        queryClient.invalidateQueries({ queryKey: ['foods'] });
        closeModal();
        
        notifications.show({
          title: 'Food Logged!',
          message: 'You have Logged the Food.',
          color: 'teal',
          icon: checkIcon,
        });
        
        form.reset();
      } catch (error) {
        console.error('Error submitting form:', error);
        
        notifications.show({
          title: 'Bummer!',
          message: 'Something went wrong, please try again later.',
          color: 'red',
          icon: xIcon,
        });
      }
    })}>
      
      <TextInput
        withAsterisk
        label="Food Name"
        placeholder="Enter name of the food.."
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      
           
      <NumberInput
        label="Calories"
        placeholder="Actual or estimated Calories"
        key={form.key('calories')}
        {...form.getInputProps('calories')}
      />
      {isTimeNow? (
        <>
         <DateTimePicker
        label="Meal Time"
        placeholder="Select Now or Meal Time"
        timePickerProps={{
            withDropdown: true,
            popoverProps: { withinPortal: false },
            format: "12h"
        }}
        maxDate={new Date()}
        clearable
        {...form.getInputProps('logged_time')}
        />
        <Button onClick={() => setIsTimeNow(false)}>
          Log Time as Now
        </Button>
        </>
      ):
      (
        <div>
        <p>Meal Time</p>
        {logTime}
        <Group >
        <Button onClick={() => {
         // current date-time in ISO format
        setLogTime(formatted);
        }}>
          Now
        </Button>
        
        <Button onClick={() => setIsTimeNow(true)}>
          Other Time
        </Button>
        </Group>
        </div>
      )}
    

      
      <Group justify="flex-end" mt="md">
        <Button type="submit">Log</Button>
      </Group>
    </form>
  );
};