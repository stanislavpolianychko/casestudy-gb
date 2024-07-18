import React, { useState } from 'react';
import { Checkbox } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Task from '@/dto/task';
import axios from 'axios';
import TaskDetail from '@/components/TaskDetailView';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { bottom } from '@popperjs/core';
import CustomCheckbox from '@/components/CompleteTaskButton';

interface TaskListItemProps {
  task: Task;
}

const TaskListItem: React.FC<TaskListItemProps> = ({ task }) => {
  const [isCompleted, setIsCompleted] = useState(task.isComplete);
  const [open, setOpen] = useState(false);

  const handleCheckboxChange = async (newIsCompleted: boolean) => {
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
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        marginBottom: '10px',
        backgroundColor: 'rgba(224, 224, 224, 0.35)', // #E0E0E0 with 35% transparency
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CustomCheckbox
          initialChecked={isCompleted}
          onCheckedChange={handleCheckboxChange}
        />
        {task.name}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
        <img src={'/edit-icon.svg'} style={{ width: '20px', height: '20px' }} />
        <img
          src={'/delete-icon.svg'}
          style={{ width: '20px', height: '20px' }}
        />
        <img
          src={'/3-dots-vertical-icon.svg'}
          style={{ width: '20px', height: '20px' }}
        />
      </div>
      <TaskDetail task={task} open={open} onClose={handleClose} />
    </div>
  );
};

export default TaskListItem;
