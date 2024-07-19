import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import TaskModalView from '@/components/taskModal/TaskModalView';
import Task from '@/dto/task';
import ModalModes from '@/enums/modalModes';
import Image from 'next/image';
import TasksService from '@/services/tasksService';
import AppConfig from '@/config';
import LanguageSystem from '@/lang';

const imageSize = 35;

/**
 * CreateTaskButton component props
 */
interface CreateTaskButtonProps {
  onCreate: () => void;
}

/**
 * CreateTaskButton component
 * @param {CreateTaskButtonProps} props - Component props
 * @returns {JSX.Element} - CreateTaskButton component
 */
const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({
  onCreate,
}: CreateTaskButtonProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = async (task?: Partial<Task>) => {
    if (!task) {
      console.error('Task is undefined');
      return;
    }

    let user;
    try {
      user = JSON.parse(
        localStorage.getItem(AppConfig.userLocalStorageKey) || '{}',
      );
    } catch (error) {
      console.error('Failed to parse user from local storage:', error);
      return;
    }

    if (!user.id) {
      console.error('User ID is undefined');
      return;
    }

    try {
      await TasksService.createTask(task!, user.id);
      onCreate();
    } catch (error) {
      console.error('Failed to create task:', error);
    }

    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen}>
        <Image
          height={imageSize}
          width={imageSize}
          src="/add-task-button.svg"
          alt={LanguageSystem.getTranslation('addTaskIcon')}
        />
      </IconButton>
      <TaskModalView
        mode={ModalModes.create}
        onClose={handleClose}
        onSubmit={handleAdd}
        isOpen={open}
      />
    </>
  );
};

export default CreateTaskButton;
