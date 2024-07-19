import React from 'react';
import { Box, Modal } from '@mui/material';
import Task from '@/dto/task';
import ModalModes from '@/enums/modalModes';
import TaskForm from '@/components/taskModal/TaskForm';
import TaskFormActions from '@/components/taskModal/TaskFormActions';

export interface TaskModalViewProps {
  mode: ModalModes;
  task?: Task;
  onSubmit: (task?: Task) => void;
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

const TaskModalView: React.FC<TaskModalViewProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  mode,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box sx={modalContentStyles}>
        <TaskForm task={task} mode={mode} />
        <TaskFormActions
          mode={mode}
          onCancel={onClose}
          onSubmit={() => onSubmit(task)}
        />
      </Box>
    </Modal>
  );
};

export default TaskModalView;
