import React from 'react';
import { Box, Button } from '@mui/material';
import ModalModes from '@/enums/modalModes';
import LanguageSystem from '@/lang';

interface TaskFormActionsProps {
  mode: ModalModes;
  onCancel: () => void;
  onSubmit: () => void;
}

const TaskFormActions: React.FC<TaskFormActionsProps> = ({
  mode,
  onCancel,
  onSubmit,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
        alignItems: 'center',
      }}
    >
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
