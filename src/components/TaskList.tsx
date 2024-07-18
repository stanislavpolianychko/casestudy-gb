import React from 'react';
import Task from '@/dto/task';
import TaskListItem from '@/components/TaskListItem';
import { Box } from '@mui/material';

interface TaskListItemProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListItemProps> = ({ tasks }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        width: '100%',
        overflow: 'auto',
      }}
    >
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </Box>
  );
};

export default TaskList;
