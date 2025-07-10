import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

interface ModalProps {
  title:string;
  buttonLabel?: string;
  children : React.ReactNode;
}

export const OpenModal = ({title, buttonLabel="Open Modal", children} :ModalProps) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={title}  overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}>
        {children}
      </Modal>

      <Button variant="default" onClick={open}>
        {buttonLabel}
      </Button>
    </>
  );
}