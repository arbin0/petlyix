
import {
  TextInput,
  PasswordInput,
  Button
  

} from '@mantine/core';
import { useForm, isEmail} from '@mantine/form';


export const LoginForm =() => {
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validateInputOnChange: true,

    validate: {
      email: isEmail('Invalid email Address'),
      password: (value) => {
        if (!value || value.trim() === '') return 'Password is required';
        return null;
        },
    },
  });

  
  

  return (
   
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          label="Email"
          placeholder="you@example.com"
          {...form.getInputProps('email')}
        />

        <PasswordInput
          mt="sm"
          label="Password"
          placeholder="Your password"
          {...form.getInputProps('password')}
        />

        
        <Button type="submit" mt="md">
          Submit
        </Button>
      </form>
   
  );
}
