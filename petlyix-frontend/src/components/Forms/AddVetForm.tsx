import { Button, Select, Group, TextInput, Text } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';

import { IconCheck, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { petsApi } from '../../api/pets'; // Import new API
import { useAuth } from '../../hooks/useState';
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface AddVetProps {
  closeModal: () => void;
}

export const AddVetForm = ({ closeModal }: AddVetProps) => {
  const queryClient = useQueryClient();

  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;
  const today = new Date();
  const { userId }  = useAuth();
  
  today.setHours(0, 0, 0, 0);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { 
    name: '',
    phone: '',
    email: '',
    main_doctor: '',
    address_line1: '',
    city : '',
    state: '',
    postal_code: '',
    country: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name too short' : null),
    
    },
  });

  return (
    <form onSubmit={form.onSubmit(async (values) => {
      try {
        // Create FormData for file upload (same logic as before)
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('type', values.type.toLowerCase());
        formData.append('breed', values.breed);
        formData.append('dob', values.dob);
        formData.append('ownerId', userId!); //Here "!" is used in userId because it will never be null and ! is just not null assertion for the type
        
        

        // ✨ NEW: Use the unified API instead of postData
        const response = await petsApi.createPet(formData);
        console.log('Pet created:', response);
        
        // Refetch pets list after success (same as before)
        queryClient.invalidateQueries({ queryKey: ['vets'] });
        closeModal();
        
        notifications.show({
          title: 'Pet Created!',
          message: 'You have created a new pet.',
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
        label="Name"
        placeholder="Your Pet Name..."
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <Text size="sm" fw={500} mb={5}>
      Phone Number
      </Text>
      <PhoneInput
        placeholder="Enter phone number"
        countryCallingCodeEditable={false}
        label ="Phone"
        defaultCountry="CA"
        value={form.values.phone}
        onChange={(value) => form.setFieldValue('phone', value || '')}
      />
      {form.errors.phone && (
        <Text c="red" size="xs" mt={3}>
          {form.errors.phone}
        </Text>
      )}
      
      <Select
        withAsterisk
        label="Type of Pet"
        placeholder='Your Pet Type'
        data={["Dog", "Cat"]}
        key={form.key('type')}
        searchable
        nothingFoundMessage="Nothing found..."
        clearable
        allowDeselect={false}
        {...form.getInputProps('type')}
      />
      
      <TextInput
        label="Breed"
        placeholder="Your Pet's Breed"
        key={form.key('breed')}
        {...form.getInputProps('breed')}
      />
      
      <DateInput
        label="Date of Birth"
        placeholder="Select Date of Birth"
        maxDate={today}
        clearable
        {...form.getInputProps('dob')}
      />


      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};