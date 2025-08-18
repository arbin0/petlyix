import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { AddFoodLogForm } from '../Forms/AddFoodLogsForm';

export const LogFoodModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Log Food"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <AddFoodLogForm closeModal={close} />
      </Modal>

      <Button variant="default" onClick={open}>
        Log Food
      </Button>
    </>
  );
};