import React from 'react';
import Task from '@/dto/task';
import TaskListItem from '@/components/TaskListItem';
import { Box, Typography } from '@mui/material';
import LanguageSystem from '@/lang';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

const taskListStyles = {
  padding: '5px',
  flexGrow: 1,
  width: '100%',
  overflow: 'auto',
};

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate }) => {
  return (
    <Box sx={taskListStyles}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskListItem onUpdate={onTaskUpdate} key={task.id} task={task} />
        ))
      ) : (
        <Typography variant="body1" color="secondary" align="center">
          {LanguageSystem.getTranslation('noTasks')}
        </Typography>
      )}
    </Box>
  );
};

export default TaskList;
