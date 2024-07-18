import React, { useState } from 'react';
import { Checkbox } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Task from '@/dto/task';
import axios from 'axios';
import TaskDetail from '@/components/TaskDetailView';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { bottom } from '@popperjs/core';

interface TaskListItemProps {
  task: Task;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const [isCompleted, setIsCompleted] = useState(task.isComplete);
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = async () => {
    const newIsCompleted = !isCompleted;
    setIsCompleted(newIsCompleted);
    task.isComplete = newIsCompleted;
    await axios.put(
      `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${task.userId}/tasks/${task.id}`,
      task,
    );
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${task.userId}/tasks/${task.id}`,
      );

      if (response.status === 404) {
        console.log('Task not found, unable to delete');
      } else {
        console.log('Task deleted successfully');
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '10px',
      }}
    >
      <Checkbox checked={isCompleted} onChange={handleCheckboxChange} />

      {task.name}
      <FontAwesomeIcon onClick={handleOpen} icon={faEdit} />

      <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
      <TaskDetail task={task} open={open} onClose={handleClose} />
    </div>
  );
};

export default TaskListItem;
