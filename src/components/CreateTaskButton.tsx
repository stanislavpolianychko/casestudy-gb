import { useState } from 'react';
import { Box, IconButton, Select, MenuItem } from '@mui/material';
import TaskModalView from './TaskModalView';
import Task from '@/dto/task';
import axios from 'axios';

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

  const handleAdd = async (task: Partial<Task>) => {
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
      <Select
        color={'secondary'}
        size="small"
        sx={{ width: { xs: '90%', md: '50%' } }}
        value={selectedTag}
        onChange={(event) => {
          setSelectedTag(event.target.value);
          onTagChange(event.target.value);
        }}
      >
        <MenuItem value={''}>no tag</MenuItem>
        <MenuItem value={'work'}>work</MenuItem>
        <MenuItem value={'personal'}>personal</MenuItem>
        <MenuItem value={'school'}>school</MenuItem>
        <MenuItem value={'others'}>others</MenuItem>
      </Select>
      <IconButton onClick={handleOpen}>
        <img
          src="/add-task-button.svg"
          style={{ width: '35px', height: '35px' }}
          alt="plus icon"
        />
      </IconButton>
      <TaskModalView
        mode={'create'}
        onClose={handleClose}
        onSubmit={handleAdd}
        isOpen={open}
      />
    </Box>
  );
};

export default CreateTaskButton;
