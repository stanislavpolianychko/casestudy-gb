import React from 'react';
import { Typography, AppBar, Toolbar, Box } from '@mui/material';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <Box sx={{ alignContent: 'center' }} position="static">
      <Typography variant="h6">{title}</Typography>
    </Box>
  );
};

export default Header;
