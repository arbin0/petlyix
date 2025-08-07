import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { LoginForm } from '../Forms/LogInForm';
import { SignUpForm } from '../Forms/SignUpForm';

interface AuthModalProps{
  type: 'login' | 'signup'
}

export const AuthModal = ({type}: AuthModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title = {type ==='login' ? "Login" : "Register"}
        
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
         {type === 'login' ? <LoginForm /> : <SignUpForm closeModal={close}/>}
      </Modal>

      <Button variant={type === 'login' ? "default" : "filled"} onClick={open}>
        {type === 'login'? 'Login' : 'Register'}
      </Button>
    </>
  );
};

