import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Slider } from '@mui/material';
import TagsSelect from '@/components/TagsSelect';
import Task from '@/dto/task';
import ModalModes from '@/enums/modalModes';

interface TaskFormProps {
  task?: Task;
  mode: ModalModes;
}

const inputFieldsStyles = {
  width: '60%',
};

const TaskForm: React.FC<TaskFormProps> = ({ task, mode }) => {
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

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
      <TextField
        color={'secondary'}
        size="small"
        value={taskName}
        sx={inputFieldsStyles}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Task name"
        disabled={mode === ModalModes.view}
      />
      <TextField
        color={'secondary'}
        size="small"
        sx={inputFieldsStyles}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder="Task description"
        disabled={mode === ModalModes.view}
      />
      <TagsSelect
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        sx={inputFieldsStyles}
      />
      <Typography id="input-slider" gutterBottom>
        Task Priority: {taskPriority}
      </Typography>
      <Slider
        size="small"
        color={'secondary'}
        sx={inputFieldsStyles}
        value={taskPriority}
        onChange={(_, newValue) => {
          setTaskPriority(newValue as number);
        }}
        aria-labelledby="input-slider"
        step={1}
        marks
        min={0}
        max={10}
        disabled={mode === ModalModes.view}
      />
    </Box>
  );
};

export default TaskForm;
