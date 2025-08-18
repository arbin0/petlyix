import { Button, Select, Group, TextInput, FileInput } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCloudUpload } from '@tabler/icons-react';
import { IconCheck, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { petsApi } from '../../api/pets'; // Import new API
import { useAuth } from '../../context/AuthContextProvider';

interface AddPetFormProps {
  closeModal: () => void;
}

export const AddPetForm = ({ closeModal }: AddPetFormProps) => {
  const queryClient = useQueryClient();
  const uploadIcon = <IconCloudUpload stroke={1.25} />;
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;
  const today = new Date();
  const { userId }  = useAuth();
  
  today.setHours(0, 0, 0, 0);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      type: '',
      breed: '',
      dob: '',
      picture: null as File | null,
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name too short' : null),
      picture: (file) => {
        if (!file) return null;

        // check file type starts with "image/"
        if (!file.type.startsWith('image/')) {
          return 'Only image files are allowed (Jpeg and Png)';
        }
      },
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
        
        
        if (values.picture) {
          formData.append('photo', values.picture);
        }

        // ✨ NEW: Use the unified API instead of postData
        const response = await petsApi.createPet(formData);
        console.log('Pet created:', response);
        
        // Refetch pets list after success (same as before)
        queryClient.invalidateQueries({ queryKey: ['pets'] });
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

      <FileInput
        leftSection={uploadIcon}
        label="Pet's Profile Picture"
        placeholder="Your Pet's Image"
        leftSectionPointerEvents="none"
        accept="image/png,image/jpeg"
        clearable
        value={form.values.picture}
        onChange={(file) => form.setFieldValue('picture', file)}
        error={form.errors.picture}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
};