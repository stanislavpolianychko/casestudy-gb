import { useState } from 'react';
import { TextField, Button, Modal, Box } from '@mui/material';

const CreateTaskButton = () => {
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    if (taskName) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
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
          padding: 0,
          width: {
            xs: '100%', // full screen width on mobile
            sm: '50%', // 50% screen width on desktop
          },
          height: '30px', // smaller height
        }}
      />
      <Button
        onClick={handleOpen}
        sx={{
          maxHeight: '10px', // smaller height
          maxWidth: '10px', // smaller width
          display: 'flex',
          alignItems: 'center', // align items in the center vertically
          justifyContent: 'center', // align items in the center horizontally
        }}
      >
        <img
          src="/add-task-button.svg"
          style={{ width: '35px', height: '35px' }}
          alt="plus icon"
        />
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {/* Add your task form here */}
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateTaskButton;
