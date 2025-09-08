import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { AddVetVisitForm } from '../Forms/AddVetVisitForm';

export const AddVetVisitModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Add Vet Visit"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <AddVetVisitForm closeModal={close} />
      </Modal>

      <Button variant="default" onClick={open}>
        Add Vet Visit
      </Button>
    </>
  );
};
