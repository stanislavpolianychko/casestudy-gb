import React from 'react';
import Task from '@/dto/task';
import TaskListItem from '@/components/TaskListItem';

interface TaskListItemProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListItemProps> = ({ tasks }) => {
  return (
    <>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </>
  );
};

export default TaskList;
