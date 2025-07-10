import { Button, Select , Group, TextInput } from '@mantine/core';
import { DateInput  } from '@mantine/dates';
import { useForm } from '@mantine/form';
export const AddPetForm = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      type: '',
      breed:'',
      dob: null as Date | null,
      picture:''
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name too short' : null),
      
    },

    
  });

  return (
       <form onSubmit={form.onSubmit((values) => {
      // Convert dob (Date object) to string before API
    //   const formattedDob = values.dob
    //     ? `${values.dob.getFullYear()}-${String(values.dob.getMonth() + 1).padStart(2, '0')}-${String(values.dob.getDate()).padStart(2, '0')}`
    //     : null;

    //   const payload = { ...values, dob: formattedDob };
    //   console.log(payload);

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
      

      

      <Group justify="flex-end" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  );
}