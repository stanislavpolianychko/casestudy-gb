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
        alignItems: 'center',
        width: {
          xs: '100%', // 100% screen width on mobile
          sm: '50%', // 50% screen width on desktop
        },
        margin: '0 auto', // center the component
      }}
    >
      <IconButton onClick={onPreviousPage} disabled={page === 1}>
        <img
          src={page === 1 ? 'nav-left-inactive.svg' : 'nav-left-active.svg'}
          alt="Previous page"
          style={{ width: '15px', height: '15px' }}
        />
      </IconButton>
      <IconButton onClick={onNextPage} disabled={!hasNextPage}>
        <img
          src={!hasNextPage ? 'nav-right-inactive.svg' : 'nav-right-active.svg'}
          alt="Next page"
          style={{ width: '15px', height: '15px' }}
        />
      </IconButton>
    </Box>
  );
};

export default PaginationNavbar;
