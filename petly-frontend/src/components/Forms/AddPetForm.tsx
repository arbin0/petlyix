import { Button, Select , Group, TextInput, FileInput  } from '@mantine/core';
import { DateInput  } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconCloudUpload } from '@tabler/icons-react';
export const AddPetForm = () => {
  const icon = <IconCloudUpload stroke={1.25}/>
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      type: '',
      breed:'',
      dob: '',
      picture:null as File | null,
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name too short' : null),
      picture: (file) => {
      if (!file) return 'Please upload an image file';

      // check file type starts with "image/"
      if (!file.type.startsWith('image/')) {
        return 'Only image files are allowed (Jpeg and Png)';
      }

      return null; // valid
    },
      
    },

    
  });

  return (
       <form onSubmit={form.onSubmit((values) => {
    // Convert dob (Date object) to string before API
      console.log(values);

      // send payload to your backend
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
        key = {form.key('type')}
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
        // 3. USE getInputProps to correctly bind the component
        {...form.getInputProps('dob')}
      />

       <FileInput
        leftSection ={icon}
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
}