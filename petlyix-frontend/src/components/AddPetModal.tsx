import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { AddPetForm } from './Forms/AddPetForm';

export const AddPetModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add New Pet"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <AddPetForm closeModal={close} />
      </Modal>

      <Button variant="default" onClick={open}>
        Add New Pet
      </Button>
    </>
  );
};