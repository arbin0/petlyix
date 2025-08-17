import {
  TextInput,
  PasswordInput,
  Button,
  Text
} from '@mantine/core';
import { useForm, isEmail, } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { authApi } from '../../api/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContextProvider';



export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const checkIcon = <IconCheck size={20} />;

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
    <div>
    <form onSubmit={form.onSubmit(async (values) => {
      setErrorMessage(null); // Clear previous errors
      try {
        const response = await authApi.login({
          email: values.email,
          password: values.password
        });

        if (response.tokens?.access && response.tokens?.refresh) {
        login(response.tokens.access, response.tokens.refresh);
        } else {
          throw new Error("Login failed: tokens missing");
        }

        console.log("Login Successful!");
        notifications.show({
          title: 'Successful!',
          message: 'You have been successfully Logged In!',
          color: 'teal',
          icon: checkIcon,
        });

        // Store tokens
       // Store tokens safely
        form.reset();
        navigate('/pets');
        
       
        
        
        // Trigger page refresh or state update for header
        // window.location.reload();
      } catch(error: any) {
          setErrorMessage(error.message);
        }
    })}>
      {errorMessage && (
        <Text c="red" size="sm" mb="md">
          {errorMessage}
        </Text>
      )}
      
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

      <Button type="submit" mt="md" disabled={!form.isValid() || form.submitting}>
        Submit
      </Button>
      
    </form>
         Don't have an account? <Link to='/signup'>Create an account</Link>

      </div>


  );
};
