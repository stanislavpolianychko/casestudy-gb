import React, { useState } from 'react';

interface CustomCheckboxProps {
  initialChecked: boolean;
  onCheckedChange: (newChecked: boolean) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  initialChecked,
  onCheckedChange,
}) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleClick = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onCheckedChange(newChecked);
  };

  return (
    <img
      onClick={handleClick}
      src={isChecked ? '/task-complete-icon.svg' : '/task-incomplete-icon.svg'}
      style={{ width: '20px', height: '20px' }}
    />
  );
};

export default CustomCheckbox;
