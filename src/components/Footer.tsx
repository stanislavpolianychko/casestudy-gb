import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ textAlign: 'center', padding: '1rem' }}>
      <Typography variant="body2" sx={{ color: '#888' }}>
        made by @staspolianychko
      </Typography>
    </Box>
  );
};

export default Footer;
