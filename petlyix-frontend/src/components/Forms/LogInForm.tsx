
import {
  TextInput,
  PasswordInput,
  Button,
  Text

} from '@mantine/core';
import { useForm, isEmail} from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconCheck, IconX, } from '@tabler/icons-react';
import { postData } from '../../services/postData';
import { useState } from 'react';

interface LoginFormProps{
  closeModal: () => void
}

export const LoginForm =({closeModal}: LoginFormProps) => {
  const [errorMessage , setErrorMessage] = useState<string | null>(null);;
  const xIcon = <IconX size={20} />;
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
   
      <form onSubmit={form.onSubmit(async (values) => {
                  try{
                    const response = await postData('/users/login/', values) as any;
                    console.log("Login Successful!")
                    notifications.show({
                      title: 'Successful!',
                      message: 'You have been successfully Logged In!',
                      color: 'teal',
                      icon: checkIcon,
                    });
                    form.reset();
            
                    localStorage.setItem("accessToken", response.tokens.access);
                    localStorage.setItem("refreshToken", response.tokens.refresh);
                    closeModal();
                  }
                  catch (error: any) {
                      console.log("Login error:", error);
                  
                        // Your clean approach - just need to adjust for your postData structure
                        if (error) {
                          Object.keys(error).forEach(field => {
                            const errorMessages = error[field];
                            if (errorMessages && errorMessages.length > 0) {
                              setErrorMessage(errorMessages[0]);
                              return; // Exit after finding first error
                            }
                          });
                          
                          // If no field-specific errors found, check for common error formats
                          if (!errorMessage) {
                            if (error.detail) {
                              setErrorMessage(error.detail);
                            } else if (error.non_field_errors && error.non_field_errors.length > 0) {
                              setErrorMessage(error.non_field_errors[0]);
                            } else {
                              setErrorMessage('We encountered an error. Please try again.');
                            }
                          }
                        }
                        
           
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
   
  );
}
