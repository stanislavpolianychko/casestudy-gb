import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface AppSurfaceProps extends BoxProps {
  children?: React.ReactNode;
}

const AppSurface: React.FC<AppSurfaceProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        height: '80%',
        width: '80%',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 0 10px 5px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        ...props.sx,
      }}
    >
      {children}
    </Box>
  );
};

export default AppSurface;
