import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import { AddAppointmentForm } from '../Forms/AddAppointmentForm';

export const AddAppointmentModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Schedule Appointment"
        centered
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <AddAppointmentForm closeModal={close} />
      </Modal>

      <Button variant="default" onClick={open}>
        Schedule Appointment
      </Button>
    </>
  );
};
