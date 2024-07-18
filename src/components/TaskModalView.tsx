import { useState, useEffect, useCallback } from 'react';
import {
  TextField,
  Button,
  Modal,
  Box,
  Slider,
  Typography,
  Select,
  MenuItem,
} from '@mui/material';
import Task from '@/dto/task';

interface TaskModalViewProps {
  mode: 'readonly' | 'create' | 'edit';
  task?: Task;
  onSubmit?: (task: Partial<Task>) => void;
  onClose?: () => void;
  isOpen: boolean;
}

const ModalContent: React.FC<TaskModalViewProps> = ({
  mode,
  task,
  onSubmit,
  onClose,
  isOpen,
}) => {
  const [selectedTag, setSelectedTag] = useState<string>(
    task?.tag || 'personal',
  );
  const [taskName, setTaskName] = useState(task?.name || '');
  const [taskDescription, setTaskDescription] = useState(
    task?.description || '',
  );
  const [taskPriority, setTaskPriority] = useState(task?.priority || 0);

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setSelectedTag(task.tag);
    }
  }, [task]);

  useEffect(() => {
    if (!isOpen) {
      setTaskName('');
      setTaskDescription('');
      setSelectedTag('personal');
      setTaskPriority(0);
    }
  }, [isOpen]);

  const handleSubmit = useCallback(async () => {
    if (onSubmit) {
      const newTask: Partial<Task> = {
        name: taskName,
        description: taskDescription,
        tag: selectedTag,
        isComplete: false,
        priority: taskPriority,
      };
      onSubmit(newTask);
    }
    if (onClose) {
      onClose();
    }
  }, [onSubmit, onClose, taskName, taskDescription, selectedTag, taskPriority]);

  return (
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
        width: {
          xs: '90%', // On extra small (xs) screens and up, the width is 90%
          md: '30%', // On medium (md) screens and up, the width is 40%
        },
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
      <Select
        color={'secondary'}
        size="small"
        sx={{ width: '60%' }}
        disabled={mode === 'readonly'}
        value={selectedTag}
        onChange={(event) => setSelectedTag(event.target.value)}
      >
        <MenuItem value={'work'}>work</MenuItem>
        <MenuItem value={'personal'}>personal</MenuItem>
        <MenuItem value={'school'}>school</MenuItem>
        <MenuItem value={'others'}>others</MenuItem>
      </Select>

      <Typography id="input-slider" gutterBottom>
        Task Priority: {taskPriority}
      </Typography>
      <Slider
        size="small"
        color={'secondary'}
        sx={{ width: '60%' }} // Adjust the width as needed
        value={taskPriority}
        onChange={(event, newValue) => {
          setTaskPriority(newValue as number);
        }}
        aria-labelledby="input-slider"
        step={1}
        marks
        min={0}
        max={10}
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
        <Button variant="outlined" color={'secondary'} onClick={onClose}>
          Cancel
        </Button>
        {mode != 'readonly' && (
          <Button variant="outlined" color={'secondary'} onClick={handleSubmit}>
            {mode === 'create' ? 'Add' : 'Save'}
          </Button>
        )}
      </Box>
    </Box>
  );
};
const TaskModalView: React.FC<TaskModalViewProps> = (props) => {
  return (
    <Modal open={props.isOpen} onClose={props.onClose}>
      <ModalContent {...props} />
    </Modal>
  );
};

export default TaskModalView;
