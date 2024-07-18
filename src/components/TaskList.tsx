import React from 'react';
import Task from '@/dto/task';
import TaskListItem from '@/components/TaskListItem';
import { Box } from '@mui/material';

interface TaskListItemProps {
  tasks: Task[];
  onUpdate: () => void;
}

const TaskList: React.FC<TaskListItemProps> = ({ tasks, onUpdate }) => {
  return (
    <Box
      sx={{
        padding: '5px',
        // background: 'white',
        flexGrow: 1,
        width: '100%',
        overflow: 'auto',
      }}
    >
      {tasks.map((task) => (
        <TaskListItem onUpdate={onUpdate} key={task.id} task={task} />
      ))}
    </Box>
  );
};

export default TaskList;
