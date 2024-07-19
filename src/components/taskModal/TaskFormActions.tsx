import ModalModes from '@/enums/modalModes';
import LanguageSystem from '@/lang';
import React from 'react';
import { Box, Button } from '@mui/material';

const taskFormActionsStyles = {
  display: 'flex',
  flexDirection: 'row',
  gap: '1rem',
  alignItems: 'center',
};

/**
 * TaskFormActions component props
 */
interface TaskFormActionsProps {
  mode: ModalModes;
  onCancel: () => void;
  onSubmit: () => void;
}

/**
 * TaskFormActions component
 * @param {TaskFormActionsProps} props - Component props
 * @returns {JSX.Element} - TaskFormActions component
 */
const TaskFormActions: React.FC<TaskFormActionsProps> = ({
  mode,
  onCancel,
  onSubmit,
}: TaskFormActionsProps): JSX.Element => {
  return (
    <Box sx={taskFormActionsStyles}>
      <Button variant="outlined" color={'secondary'} onClick={onCancel}>
        {LanguageSystem.getTranslation('btnCancel')}
      </Button>
      <Button
        variant="outlined"
        color={'secondary'}
        onClick={onSubmit}
        disabled={mode === ModalModes.view}
      >
        {mode === ModalModes.create
          ? LanguageSystem.getTranslation('btnAdd')
          : LanguageSystem.getTranslation('btnSave')}
      </Button>
    </Box>
  );
};

export default TaskFormActions;
