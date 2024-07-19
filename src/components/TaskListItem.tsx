import React, { useState } from 'react';
import Task from '@/dto/task';
import CompleteTaskButton from '@/components/CompleteTaskButton';
import TaskModalView from '@/components/taskModal/TaskModalView';
import { Box } from '@mui/material';
import Image from 'next/image';
import ModalModes from '@/enums/modalModes';
import TasksService from '@/services/tasksService';

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

/**
 * TaskListItem component props
 */
interface TaskListItemProps {
  task: Task;
  onUpdate: () => void;
}

/**
 * TaskListItem component
 * @param {TaskListItemProps} props - Component props
 * @returns {JSX.Element} - TaskListItem component
 */
const TaskListItem: React.FC<TaskListItemProps> = ({
  task,
  onUpdate,
}: TaskListItemProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<ModalModes>(ModalModes.view);

  const handleOpen = (mode: ModalModes) => {
    setMode(mode);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = async (updatedTask?: Partial<Task>) => {
    try {
      await TasksService.updateTask(updatedTask);
      onUpdate();
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      handleClose();
    }
  };

  const handleDelete = async () => {
    try {
      await TasksService.deleteTask(task);
      onUpdate();
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      handleClose();
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
          src={'/edit-icon.svg'}
          onClick={() => handleOpen(ModalModes.edit)}
        />
        <Image
          alt={'Delete'}
          width={iconSize}
          height={iconSize}
          src={'/delete-icon.svg'}
          onClick={() => handleDelete()}
        />
        <Image
          alt={'Info'}
          width={iconSize}
          height={iconSize}
          src={'/3-dots-vertical-icon.svg'}
          onClick={() => handleOpen(ModalModes.view)}
        />
      </Box>
      <TaskModalView
        mode={mode}
        onSubmit={() => handleEdit(task)}
        onClose={handleClose}
        isOpen={open}
        task={task}
      />
    </Box>
  );
};

export default TaskListItem;
