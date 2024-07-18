import { useState } from 'react';
import { TextField, Button, Modal, Box, IconButton } from '@mui/material';

const CreateTaskButton = () => {
  const [taskName, setTaskName] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    // Add your task adding logic here
    handleClose();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center', // This aligns children along the vertical line in the center
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
          height: '30px',
        }}
      />
      <IconButton
        onClick={handleOpen}
        sx={{
          display: 'flex',
          alignItems: 'center', // align items in the center vertically
          justifyContent: 'center', // align items in the center horizontally
          padding: '10px', // increase the size of the IconButton
          height: '30px', // match the height with TextField
          marginBottom: '-10px', // add margin to the right of the IconButton
        }}
      >
        <img
          onClick={handleOpen}
          src="/add-task-button.svg"
          style={{ width: '35px', height: '35px' }}
          alt="plus icon"
        />
      </IconButton>
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
          <Button onClick={handleAdd}>Add</Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreateTaskButton;
