import { Select, MenuItem, BoxProps } from '@mui/material';
import { Tags } from '@/enums/tags';
import React from 'react';

interface TagsSelectProps {
  selectedTag: string;
  onTagChange: (tag: string) => void;
  sx?: BoxProps['sx'];
}

const TagsSelect: React.FC<TagsSelectProps> = ({
  selectedTag,
  onTagChange,
  sx,
}) => {
  return (
    <Select
      color={'secondary'}
      size="small"
      sx={sx}
      value={selectedTag}
      onChange={(event) => {
        const tag = event.target.value;
        onTagChange(tag);
      }}
    >
      {Object.values(Tags).map((tag) => (
        <MenuItem key={tag} value={tag}>
          {tag || 'no tag found'}
        </MenuItem>
      ))}
    </Select>
  );
};

export default TagsSelect;
