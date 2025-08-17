import {
  TextInput,
  PasswordInput,
  Progress,
  Text,
  Group,
  Box,
  Button,
  Center,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, isEmail } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';
import { api } from '../../api/client';
import { useState } from 'react';

function PasswordRequirement({ meets, label }: { meets: boolean; label: string }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} mt={5} size="sm">
      <Center inline>
        {meets ? <IconCheck size={14} stroke={1.5} /> : <IconX size={14} stroke={1.5} />}
        <Box ml={7}>{label}</Box>
      </Center>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: 'Includes number' },
  { re: /[a-z]/, label: 'Includes lowercase letter' },
  { re: /[A-Z]/, label: 'Includes uppercase letter' },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'Includes special symbol' },
];

function getStrength(password1: string) {
  let multiplier = password1.length > 5 ? 0 : 1;

  requirements.forEach((req) => {
    if (!req.re.test(password1)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
}


export const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState< string | null>(null);
  const xIcon = <IconX size={20} />;
  const checkIcon = <IconCheck size={20} />;

  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      username: '',
      email: '',
      password1: '',
      password2: ''
    },
    validateInputOnChange: true,
    validate: {
      firstname: (value) => {
        if (!value || value.trim() === '') return 'Firstname is Required';
        return null;
      },
      lastname: (value) => {
        if (!value || value.trim() === '') return 'Lastname is Required';
        return null;
      },
      username: (value) => {
        if (!value || value.trim() === '') return 'Username is Required';
        return null;
      },
      email: isEmail('Invalid email Address'),
      password1: (value) => {
        if (value.length < 8) return 'Must be at least 8 characters';
        if (!/[a-z]/.test(value)) return 'Must include a lowercase letter';
        if (!/[A-Z]/.test(value)) return 'Must include an uppercase letter';
        if (!/\d/.test(value)) return 'Must include a number';
        if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value)) return 'Must include a special character';
        return null;
      },
      password2: (value, values) =>
        value !== values.password1 ? 'Passwords do not match' : null,
    },
  });

  const password1 = form.values.password1;
  const strength = getStrength(password1);

  const bars = Array(4)
    .fill(0)
    .map((_, i) => (
      <Progress
        key={i}
        value={
          password1.length > 0 && i === 0
            ? 100
            : strength >= ((i + 1) / 4) * 100
            ? 100
            : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        size={4}
        styles={{ section: { transitionDuration: '0ms' } }}
      />
    ));

  const checks = requirements.map((req, i) => (
    <PasswordRequirement key={i} label={req.label} meets={req.re.test(password1)} />
  ));

  return (
    <form onSubmit={form.onSubmit(async (values) => {
      try {
        await api.post('/users/register/', values);
        console.log("User Created!");
        notifications.show({
          title: 'Successful!',
          message: 'You have been successfully registered!',
          color: 'teal',
          icon: checkIcon,
        });
        form.reset();

      } catch (error: any) {
        setErrorMessage(error.message)
      }
    })}>
      {errorMessage && (
        <Text c="red" size="sm" mb="md">
          {errorMessage}
        </Text>
      )}
      <Group grow>
        <TextInput
          label="First Name"
          placeholder="John"
          withAsterisk
          {...form.getInputProps('firstname')}
        />
        <TextInput
          label="Last Name"
          placeholder="Smith"
          withAsterisk
          {...form.getInputProps('lastname')}
        />
      </Group>
      
      <TextInput
        label="Username"
        placeholder="Username123"
        withAsterisk
        {...form.getInputProps('username')}
      />
      
      <TextInput
        label="Email"
        placeholder="you@example.com"
        withAsterisk
        {...form.getInputProps('email')}
      />

      <PasswordInput
        mt="sm"
        label="Password"
        placeholder="Your password"
        withAsterisk
        {...form.getInputProps('password1')}
      />

      {form.isTouched('password1') ? (
        <>
      <Group gap={5} grow mt="xs" mb="md">
        {bars}
        
      </Group>

      <PasswordRequirement label="Has at least 8 characters" meets={password1.length > 7} />
      {checks}
      </>
        ): null}
      <PasswordInput
        mt="sm"
        label="Confirm Password"
        placeholder="Please confirm your password"
        withAsterisk
        {...form.getInputProps('password2')}
      />

      <Button type="submit" mt="md" disabled={!form.isValid() || form.submitting}>
        Sign Up
      </Button>
    </form>
  );
};