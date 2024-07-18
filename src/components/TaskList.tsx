import React from 'react';
import Task from '@/dto/task';
import TaskListItem from '@/components/TaskListItem';
import { Box, Typography } from '@mui/material';

interface TaskListItemProps {
  tasks: Task[];
  onUpdate: () => void;
}

const TaskList: React.FC<TaskListItemProps> = ({ tasks, onUpdate }) => {
  return (
    <Box
      sx={{
        padding: '5px',
        flexGrow: 1,
        width: '100%',
        overflow: 'auto',
      }}
    >
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TaskListItem onUpdate={onUpdate} key={task.id} task={task} />
        ))
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          No tasks found
        </Typography>
      )}
    </Box>
  );
};

export default TaskList;
