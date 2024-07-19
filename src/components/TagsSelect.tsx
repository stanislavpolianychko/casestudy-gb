import LanguageSystem from '@/lang';
import React from 'react';
import { Tags } from '@/enums/tags';
import { Select, MenuItem } from '@mui/material';

/**
 * TagsSelect component props
 */
interface TagsSelectProps {
  disabled: boolean;
  selectedTag: string | null;
  onTagChange: (tag: string) => void;
  sx?: any;
}

/**
 * TagsSelect component
 * @param {TagsSelectProps} props - Component props
 * @returns {JSX.Element} - TagsSelect component
 */
const TagsSelect: React.FC<TagsSelectProps> = ({
  disabled,
  selectedTag,
  onTagChange,
  sx,
}: TagsSelectProps): JSX.Element => {
  return (
    <Select
      disabled={disabled}
      color={'secondary'}
      size="small"
      sx={sx}
      value={selectedTag}
      onChange={(event) => {
        const tag = event.target.value;
        if (tag) {
          onTagChange(tag);
        }
      }}
    >
      {Object.values(Tags).map((tag) => (
        <MenuItem key={tag} value={tag}>
          {LanguageSystem.getTranslation(`tag${tag}`)}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TagsSelect;
