import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Checkbox } from '@mui/material';
import Task from '@/dto/task';
import axios from 'axios';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TaskDetailProps {
  task: Task;
  open: boolean;
  onClose: () => void;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ task, open, onClose }) => {
  const [name, setName] = useState(task.name);
  const [isComplete, setIsComplete] = useState(task.isComplete);
  const [tags, setTags] = useState(task.tags);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [userId, setUserId] = useState(task.userId);

  const handleSave = async () => {
    const taskToUpdate = { name, isComplete, tags, dueDate, userId };

    try {
      const response = await axios.put(
        `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/tasks/${task.id}`,
        taskToUpdate,
      );

      console.log('Task saved successfully:', response.data);
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="task-detail-title"
      aria-describedby="task-detail-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'white',
          boxShadow: 24,
          p: 4,
        }}
      >
        <FontAwesomeIcon
          icon={faTimes}
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
        />

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Checkbox
          checked={isComplete}
          onChange={(e) => setIsComplete(e.target.checked)}
        />
        <TextField
          label="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <TextField
          label="Due Date"
          type="date"
          value={new Date(dueDate).toISOString().split('T')[0]}
          onChange={(e) => setDueDate(new Date(e.target.value).getTime())}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <FontAwesomeIcon
          icon={faSave}
          onClick={async () => {
            await handleSave();
            onClose();
          }}
        />
      </Box>
    </Modal>
  );
};

export default TaskDetail;
