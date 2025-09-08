import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { AddPetHealthForm } from '../Forms/AddPetHealthForm';

export const AddPetHealthModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Pet Health Record"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <AddPetHealthForm closeModal={close} />
      </Modal>

      <Button variant="default" onClick={open}>
        Add Health Record
      </Button>
    </>
  );
};
