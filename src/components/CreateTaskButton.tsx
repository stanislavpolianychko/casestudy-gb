import { useState } from 'react';
import { Box, IconButton } from '@mui/material';
import TaskModalView from '@/components/taskModal/TaskModalView';
import Task from '@/dto/task';
import axios from 'axios';
import TagsSelect from '@/components/TagsSelect';
import ModalModes from '@/enums/modalModes';
import Image from 'next/image';

interface CreateTaskButtonProps {
  onCreate: () => void;
  onTagChange: (tag: string) => void;
}

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({
  onCreate,
  onTagChange,
}) => {
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>('');

  const handleOpen = () => {
    if (taskName) {
      setTaskName('');
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async (task?: Partial<Task>) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    try {
      const response = await axios.post(
        `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${user.id}/tasks`,
        task,
      );
      console.log('here just for test', task);
      console.log('Task created successfully:', response.data);
      onCreate();
    } catch (error) {
      console.error('Failed to create task:', error);
    }

    handleClose();
  };

  return (
    <Box
      sx={{
        margin: '1rem 0',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TagsSelect
        selectedTag={selectedTag}
        onTagChange={(tag) => {
          setSelectedTag(tag);
          onTagChange(tag);
        }}
        sx={{ width: { xs: '90%', md: '50%' } }}
      />
      <IconButton onClick={handleOpen}>
        <Image
          height={35}
          width={35}
          src="/add-task-button.svg"
          alt="plus icon"
        />
      </IconButton>
      <TaskModalView
        mode={ModalModes.create}
        onClose={handleClose}
        onSubmit={handleAdd}
        isOpen={open}
      />
    </Box>
  );
};

export default CreateTaskButton;
