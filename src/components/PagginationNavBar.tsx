import React from 'react';
import { IconButton, Box } from '@mui/material';

interface PaginationNavbarProps {
  page: number;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

const PaginationNavbar: React.FC<PaginationNavbarProps> = ({
  page,
  hasNextPage,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: {
          xs: '100%',
          sm: '50%',
        },
        margin: '0 auto',
      }}
    >
      <IconButton onClick={onPreviousPage} disabled={page === 1}>
        <img
          src="/nav-left.svg"
          alt="Previous page"
          style={{ width: '15px', height: '15px' }}
        />
      </IconButton>
      <IconButton onClick={onNextPage} disabled={!hasNextPage}>
        <img
          src="/nav-right.svg"
          alt="Next page"
          style={{ width: '15px', height: '15px' }}
        />
      </IconButton>
    </Box>
  );
};

export default PaginationNavbar;
