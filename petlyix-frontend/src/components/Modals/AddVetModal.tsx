import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { AddVetForm } from '../Forms/AddVetForm';

export const AddVetModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add New Vet"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <AddVetForm closeModal={close} />
      </Modal>

      <Button variant="default" onClick={open}>
        Add New Pet
      </Button>
    </>
  );
};