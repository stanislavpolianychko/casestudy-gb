import AppConfig from '@/config';
import React from 'react';
import { Slider } from '@mui/material';

/**
 * TaskPriorityPickerProps component props
 */
interface TaskPriorityPickerProps {
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
  sx: any;
}

/**
 * TaskPriorityPicker component
 * @param {TaskPriorityPickerProps} props - Component props
 * @returns {JSX.Element} - TaskPriorityPicker component
 */
const TaskPriorityPicker: React.FC<TaskPriorityPickerProps> = ({
  value,
  onChange,
  disabled,
  sx,
}: TaskPriorityPickerProps): JSX.Element => {
  return (
    <Slider
      size="small"
      color={'secondary'}
      sx={sx}
      value={value}
      onChange={(_, newValue) => {
        onChange(newValue as number);
      }}
      aria-labelledby="input-slider"
      step={AppConfig.taskPriorityStep}
      marks
      min={AppConfig.taskPriorityMin}
      max={AppConfig.taskPriorityMax}
      disabled={disabled}
    />
  );
};

export default TaskPriorityPicker;
