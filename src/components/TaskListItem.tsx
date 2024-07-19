import React, { useState } from 'react';
import Task from '@/dto/task';
import axios from 'axios';
import CompleteTaskButton from '@/components/CompleteTaskButton';
import TaskModalView from '@/components/taskModal/TaskModalView';
import { Box } from '@mui/material';
import Image from 'next/image';
import ModalModes from '@/enums/modalModes';

interface TaskListItemProps {
  task: Task;
  onUpdate: () => void;
}

const editIconPath = '/edit-icon.svg';
const deleteIconPath = '/delete-icon.svg';
const viewIconPath = '/3-dots-vertical-icon.svg';

const iconSize = 20;

const taskListItemStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    marginBottom: '10px',
  },
  taskInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    gap: '30px',
  },
};

const updateTask = async (task: Task, updatedTask: Partial<Task>) => {
  const response = await axios.put(
    `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${task.userId}/tasks/${task.id}`,
    updatedTask,
  );
  return response.data;
};

const deleteTask = async (task: Task) => {
  const response = await axios.delete(
    `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${task.userId}/tasks/${task.id}`,
  );
  return response.status;
};

const TaskListItem: React.FC<TaskListItemProps> = ({ task, onUpdate }) => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ModalModes>(ModalModes.view);

  const handleOpen = (mode: ModalModes) => {
    setMode(mode);
    setOpen(true);
  };

  const handleEdit = async (updatedTask?: Partial<Task>) => {
    try {
      await updateTask(task, updatedTask!);
      console.log('Task updated successfully');
    } catch (error) {
      console.error('Failed to update task:', error);
    }
    onUpdate();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      const status = await deleteTask(task);
      if (status === 404) {
        console.log('Task not found, unable to delete');
      } else {
        console.log('Task deleted successfully');
      }
      onUpdate();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <Box sx={taskListItemStyles.container}>
      <Box sx={taskListItemStyles.taskInfo}>
        <CompleteTaskButton task={task} />
        {task.name.length > 15 ? `${task.name.substring(0, 15)}...` : task.name}
      </Box>
      <Box sx={taskListItemStyles.actions}>
        <Image
          alt={'Edit'}
          width={iconSize}
          height={iconSize}
          src={editIconPath}
          onClick={() => handleOpen(ModalModes.edit)}
        />
        <Image
          alt={'Delete'}
          width={iconSize}
          height={iconSize}
          src={deleteIconPath}
          onClick={() => handleDelete()}
        />
        <Image
          alt={'Info'}
          width={iconSize}
          height={iconSize}
          src={viewIconPath}
          onClick={() => handleOpen(ModalModes.view)}
        />
      </Box>
      <TaskModalView
        mode={mode}
        onSubmit={handleEdit}
        onClose={handleClose}
        isOpen={open}
        task={task}
      />
    </Box>
  );
};

export default TaskListItem;
