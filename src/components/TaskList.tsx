import TaskListItem from '@/components/TaskListItem';
import LanguageSystem from '@/lang';
import Task from '@/dto/task';
import React from 'react';
import { Box, Typography } from '@mui/material';

const taskListStyles = {
  padding: '5px',
  flexGrow: 1,
  width: '100%',
  overflow: 'auto',
};

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate: () => void;
}

/**
 * TaskList component.
 * This component displays a list of tasks.
 * If there are no tasks, it displays a message saying there are no tasks.
 *
 * @param {TaskListProps} props - The props for the component.
 * @param {Task[]} props.tasks - The tasks to display in the list.
 * @param {Function} props.onTaskUpdate - Function to call when a task is updated.
 * @returns {JSX.Element} The TaskList component.
 */
const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskUpdate,
}: TaskListProps): JSX.Element => {
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
