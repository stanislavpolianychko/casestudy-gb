import { useState } from 'react';
import { TextField, Button, Box, IconButton } from '@mui/material';
import TaskModalView from './TaskModalView';
import Task from '@/dto/task';

const CreateTaskButton = () => {
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (task: Task) => {
    // Handle add task
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
      <TextField
        color={'secondary'}
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        size={'small'}
        sx={{
          width: {
            xs: '100%',
            sm: '50%',
          },
        }}
      />
      <IconButton onClick={handleOpen}>
        <img
          src="/add-task-button.svg"
          style={{ width: '35px', height: '35px' }}
          alt="plus icon"
        />
      </IconButton>
      <TaskModalView
        mode="create"
        onClose={handleClose}
        onSubmit={handleAdd}
        isOpen={open}
      />
    </Box>
  );
};

export default CreateTaskButton;
