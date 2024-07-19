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
 * @interface
 * @property {Task} task - Task object
 * @property {ModalModes} mode - Mode of the modal
 */
interface TaskFormProps {
  task?: Task;
  mode: ModalModes;
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
}: TaskFormProps): JSX.Element => {
  const [selectedTag, setSelectedTag] = useState<string>(
    task?.tag || Tags.None,
  );
  const [taskName, setTaskName] = useState(task?.name || '');
  const [taskDescription, setTaskDescription] = useState(
    task?.description || '',
  );
  const [taskPriority, setTaskPriority] = useState(task?.priority || 0);
  const isDisabled = mode === ModalModes.view;

  useEffect(() => {
    if (task) {
      setTaskName(task.name);
      setTaskDescription(task.description);
      setSelectedTag(task.tag);
    }
  }, [task]);

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
