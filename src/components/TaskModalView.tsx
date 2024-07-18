import { useState, useEffect } from 'react';
import { TextField, Button, Modal, Box } from '@mui/material';
import Task from '@/dto/task';
import axios from 'axios';

interface TaskModalViewProps {
  mode: 'readonly' | 'create' | 'edit';
  task?: Task;
  onSubmit?: (task: Task) => void;
  onClose?: () => void;
  isOpen: boolean;
}

const TaskModalView: React.FC<TaskModalViewProps> = ({
  mode,
  task,
  onSubmit,
  onClose,
  isOpen,
}) => {
  // State variables
  const [taskName, setTaskName] = useState(task?.name || '');
  const [taskDescription, setTaskDescription] = useState(
    task?.description || '',
  );
  const [taskTags, setTaskTags] = useState(task?.tags || '');
  const [taskDueDate, setTaskDueDate] = useState(
    task?.dueDate || new Date().getTime(),
  );

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setTaskTags(task.tags);
      setTaskDueDate(task.dueDate);
    }
  }, [task]);

  // Handlers

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleSubmit = async () => {
    // if (onSubmit) {
    //   const newTask = {
    //     name: taskName,
    //     description: taskDescription,
    //     tags: taskTags,
    //     dueDate: taskDueDate,
    //     // Add other task properties as needed
    //   };
    //
    //   // Get the user data from local storage
    //   const user = JSON.parse(localStorage.getItem('user') || '{}');
    //
    //   if (mode === 'create') {
    //     try {
    //       const response = await axios.post(`https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${user.id}/tasks`, newTask);
    //       console.log('Task created successfully:', response.data);
    //     } catch (error) {
    //       console.error('Failed to create task:', error);
    //     }
    //   } else if (mode === 'edit' && task) {
    //     try {
    //       const response = await axios.put(`https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${user.id}/tasks/${task.id}`, newTask);
    //       console.log('Task updated successfully:', response.data);
    //     } catch (error) {
    //       console.error('Failed to update task:', error);
    //     }
    //   }
    //   // onSubmit(newTask);
    // }
    //
    // handleClose();
  };

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          position: 'absolute',
          width: '90%',
          gap: '1rem',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'background.paper',
        }}
      >
        <TextField
          color={'secondary'}
          size="small"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Task name"
          disabled={mode === 'readonly'}
        />
        <TextField
          color={'secondary'}
          size="small"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task description"
          disabled={mode === 'readonly'}
        />
        <TextField
          color={'secondary'}
          size="small"
          value={taskTags}
          onChange={(e) => setTaskTags(e.target.value)}
          placeholder="Task tag"
          disabled={mode === 'readonly'}
        />
        <TextField
          color={'secondary'}
          size="small"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(Number(e.target.value))}
          placeholder="Task due date"
          type="date"
          disabled={mode === 'readonly'}
        />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '1rem',
            alignItems: 'center',
          }}
        >
          <Button variant="outlined" color={'secondary'} onClick={handleClose}>
            Cancel
          </Button>
          {mode != 'readonly' && (
            <Button
              variant="outlined"
              color={'secondary'}
              onClick={handleSubmit}
            >
              {mode === 'create' ? 'Add' : 'Save'}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModalView;
