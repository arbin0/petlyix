import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group } from '@mantine/core';
import { petsApi } from '../../api/pets';
import { useParams, useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

export const DeletePetModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const { petId } = useParams();
  const queryClient = useQueryClient();
  const checkIcon = <IconCheck size={20} />;

  const handleDelete = async () => {
    if (!petId) return;

    try {
      await petsApi.deletePet(petId); // Use the new pets API
      console.log('Pet is Deleted successfully');
      
      // Invalidate and refetch pets list
      queryClient.invalidateQueries({ queryKey: ['pets'] });
      
      navigate('/pets');
      close();
      
      notifications.show({
        title: 'Pet Deleted!',
        message: 'You have successfully deleted the pet',
        color: 'teal',
        icon: checkIcon,
      });
    } catch (error) {
      console.error('Delete failed', error);
      notifications.show({
        title: 'Error!',
        message: 'Failed to delete pet. Please try again.',
        color: 'red',
      });
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Pet">
        Are you sure you want to delete this pet? This action cannot be undone. If you are
        sure, press confirm button below.
        <Group mt="lg" justify="flex-end">
          <Button onClick={close} variant="default">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="red">
            Confirm
          </Button>
        </Group>
      </Modal>

      <Button onClick={open} color="red">
        Delete
      </Button>
    </>
  );
};