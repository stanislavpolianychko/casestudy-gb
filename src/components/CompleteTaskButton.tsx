import IconButton from '@mui/material/IconButton';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import Task from '@/dto/task';
import axios from 'axios';
import LanguageSystem from '@/lang';

/**
 * Function to get task status based on isChecked state
 * @param {boolean} isChecked - The checked state of the checkbox
 * @returns {{src: string; alt: string}} An object containing the src and alt attributes for the image
 */
const getTaskStatus = (isChecked: boolean): { src: string; alt: string } => {
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

// Define the size of the image
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
  // Define the isChecked state
  const [isChecked, setIsChecked] = useState(task.isComplete);

  // Define the handleClick function
  const handleClick = useCallback(async () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    task.isComplete = newChecked;
    // Call API to update the task's complete status
    await axios.put(
      // TODO: use apiClient
      `https://669798f302f3150fb66e44ba.mockapi.io/api/v1/users/${task.userId}/tasks/${task.id}`,
      task,
    );
  }, [isChecked, task]);

  // Get the task status
  const taskStatus = getTaskStatus(isChecked);

  // Render the CompleteTaskButton component
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
