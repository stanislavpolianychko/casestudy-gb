import React, { useState } from 'react';
import { Box, Modal } from '@mui/material';
import Task from '@/dto/task';
import ModalModes from '@/enums/modalModes';
import TaskForm from '@/components/taskModal/TaskForm';
import TaskFormActions from '@/components/taskModal/TaskFormActions';
import Tags from '@/enums/tags';

/**
 * TaskModalView component props
 */
export interface TaskModalViewProps {
  mode: ModalModes;
  task?: Task;
  onSubmit: (task?: Partial<Task>) => void;
  onClose: () => void;
  isOpen: boolean;
}

const modalContentStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  borderRadius: '8px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  position: 'absolute',
  width: {
    xs: '90%',
    md: '30%',
  },
  gap: '1rem',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'background.paper',
};

/**
 * TaskModalView component
 * @param {TaskModalViewProps} props - Component props
 * @returns {JSX.Element} - TaskModalView component
 */
const TaskModalView: React.FC<TaskModalViewProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  mode,
}: TaskModalViewProps): JSX.Element => {
  const [selectedTag, setSelectedTag] = useState<string>(
    task?.tag || Tags.None,
  );
  const [taskName, setTaskName] = useState(task?.name || '');
  const [taskDescription, setTaskDescription] = useState(
    task?.description || '',
  );
  const [taskPriority, setTaskPriority] = useState(task?.priority || 0);

  const isDisabled = mode === ModalModes.view;

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalContentStyles}>
        <TaskForm
          task={task}
          mode={mode}
          taskName={taskName}
          setTaskName={setTaskName}
          taskDescription={taskDescription}
          setTaskDescription={setTaskDescription}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
          taskPriority={taskPriority}
          setTaskPriority={setTaskPriority}
          isDisabled={isDisabled}
        />
        <TaskFormActions
          mode={mode}
          onCancel={onClose}
          onSubmit={() =>
            onSubmit({
              name: taskName,
              description: taskDescription,
              tag: selectedTag,
              priority: taskPriority,
            })
          }
        />
      </Box>
    </Modal>
  );
};

export default TaskModalView;
