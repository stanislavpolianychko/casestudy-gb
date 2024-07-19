import TaskPriorityPicker from '@/components/TaskPriorityPicker';
import TagsSelect from '@/components/TagsSelect';
import ModalModes from '@/enums/modalModes';
import LanguageSystem from '@/lang';
import Tags from '@/enums/tags';
import Task from '@/dto/task';
import { Box, TextField, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

/**
 * TaskFormProps interface for TaskForm component props
 */
interface TaskFormProps {
  task?: Task;
  mode: ModalModes;
  taskName: string;
  setTaskName: (name: string) => void;
  taskDescription: string;
  setTaskDescription: (description: string) => void;
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  taskPriority: number;
  setTaskPriority: (priority: number) => void;
  isDisabled: boolean;
}
/**
 * Styles for the TaskForm component
 */
const formStyles = {
  box: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  },
  inputFieldsStyles: {
    width: '60%',
  },
};

/**
 * TaskForm component
 * @param {TaskFormProps} props - Component props
 * @returns {JSX.Element} - TaskForm component
 */
const TaskForm: React.FC<TaskFormProps> = ({
  task,
  mode,
  taskName,
  setTaskName,
  taskDescription,
  setTaskDescription,
  selectedTag,
  setSelectedTag,
  taskPriority,
  setTaskPriority,
  isDisabled,
}: TaskFormProps): JSX.Element => {
  return (
    <Box sx={formStyles.box}>
      <TextField
        color={'secondary'}
        size="small"
        value={taskName}
        sx={formStyles.inputFieldsStyles}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder={LanguageSystem.getTranslation('tasNameLabel')}
        disabled={isDisabled}
      />
      <TextField
        color={'secondary'}
        size="small"
        sx={formStyles.inputFieldsStyles}
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        placeholder={LanguageSystem.getTranslation('taskDescriptionLabel')}
        disabled={isDisabled}
      />
      <TagsSelect
        selectedTag={selectedTag}
        disabled={isDisabled}
        onTagChange={(tag) => setSelectedTag(tag || Tags.Personal)}
        sx={formStyles.inputFieldsStyles}
      />
      <Typography id="input-slider" gutterBottom>
        {LanguageSystem.getTranslation('taskPriorityLabel')}
        {taskPriority}
      </Typography>
      <TaskPriorityPicker
        value={taskPriority}
        onChange={setTaskPriority}
        disabled={isDisabled}
        sx={formStyles.inputFieldsStyles}
      />
    </Box>
  );
};

export default TaskForm;
