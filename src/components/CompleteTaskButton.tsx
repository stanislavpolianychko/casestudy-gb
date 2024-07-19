import TasksService from '@/services/tasksService';
import IconButton from '@mui/material/IconButton';
import LanguageSystem from '@/lang';
import Image from 'next/image';
import Task from '@/dto/task';
import React, { useState, useCallback } from 'react';

/**
 * Function to get task status based on isChecked state
 * @param {boolean} isChecked - The checked state of the checkbox
 * @returns {{src: string; alt: string}} An object containing the src and alt attributes for the image
 */
const getTaskStatusImageInfo = (
  isChecked: boolean,
): { src: string; alt: string } => {
  return isChecked
    ? {
        src: '/task-complete-icon.svg',
        alt: LanguageSystem.getTranslation('taskCompleted'),
      }
    : {
        src: '/task-incomplete-icon.svg',
        alt: LanguageSystem.getTranslation('taskIncomplete'),
      };
};

const imageSizes = 20;

/**
 * CompleteTaskButtonProps interface
 * @interface
 * @property {Task} task - The task object
 */
interface CompleteTaskButtonProps {
  task: Task;
}

/**
 * CompleteTaskButton component
 * @param {object} props - The props for the component
 * @param {Task} props.task - The task object
 * @returns {JSX.Element} The rendered CompleteTaskButton component
 */
const CompleteTaskButton: React.FC<CompleteTaskButtonProps> = ({
  task,
}: {
  task: Task;
}): JSX.Element => {
  const [isChecked, setIsChecked] = useState(task.isComplete);

  const handleClick = useCallback(async () => {
    setIsChecked(!task.isComplete);
    await TasksService.updateTaskIsComplete(task);
  }, [isChecked, task]);

  const taskStatus = getTaskStatusImageInfo(isChecked);

  return (
    <IconButton onClick={handleClick}>
      <Image
        width={imageSizes}
        height={imageSizes}
        src={taskStatus.src}
        alt={taskStatus.alt}
      />
    </IconButton>
  );
};

export default CompleteTaskButton;
