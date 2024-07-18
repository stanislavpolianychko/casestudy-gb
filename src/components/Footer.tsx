import React from 'react';
import { Box, Typography } from '@mui/material';
import LanguageSystem from '@/lang';

const styles = {
  textAlign: 'center',
  padding: '1rem',
};

/**
 * Footer component
 * This component renders the footer of the application.
 * @returns {JSX.Element} The rendered Footer component
 */
function Footer(): JSX.Element {
  return (
    <Box sx={styles}>
      <Typography variant="body2" sx={{ color: '#888' }}>
        {LanguageSystem.getTranslation('madeBy')}
      </Typography>
    </Box>
  );
}

export default Footer;
