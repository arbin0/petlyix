import { useDisclosure } from '@mantine/hooks';
import { Modal, Button,Group } from '@mantine/core';
import { deleteData } from '../../services/deleteData';
import { useParams,useNavigate } from 'react-router-dom';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';





export const DeletePetModal = () => {
    
    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const { petId } = useParams();
    const checkIcon = <IconCheck size={20} />;
    const handleDelete = async () => {
    try {
    
      await deleteData(`/pets/${petId}/`); //Deleting the Pet
      console.log('Pet is Deleted successfully');
      navigate(`/pets`);
      close();
      notifications.show({
                  title: 'Pet Deleated!',
                  message: 'You have Deleted the Pet',
                  color: 'teal',
                  icon: checkIcon,
                });
      
      

    } catch (error) {
      console.error('Delete failed', error);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Authentication">
        Are you sure you want to perform this action? This action cannot be undone. If you are
          sure, press confirm button below.

          <Group mt="lg" justify="flex-end">
            <Button onClick={ close } variant="default">
              Cancel
            </Button>
            <Button onClick= {handleDelete} color="red">
              Confirm
            </Button>
          </Group>
      </Modal>
      

      <Button onClick={open} color="red">
        Delete
      </Button>
    </>
  );
}