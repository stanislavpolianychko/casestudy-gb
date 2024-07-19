import React from 'react';
import { IconButton, Box } from '@mui/material';
import Image from 'next/image';

interface PaginationNavbarProps {
  page: number;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  src: string;
  alt: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  disabled,
  src,
  alt,
}) => (
  <IconButton onClick={onClick} disabled={disabled}>
    <Image src={src} alt={alt} height={15} width={15} />
  </IconButton>
);

const navbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  width: {
    xs: '100%',
    sm: '50%',
  },
  margin: '0 auto',
};

const PaginationNavbar: React.FC<PaginationNavbarProps> = ({
  page,
  hasNextPage,
  onPreviousPage,
  onNextPage,
}) => {
  return (
    <Box sx={navbarStyles}>
      <PaginationButton
        onClick={onPreviousPage}
        disabled={page === 1}
        src="/nav-left.svg"
        alt="Previous page"
      />
      <PaginationButton
        onClick={onNextPage}
        disabled={!hasNextPage}
        src="/nav-right.svg"
        alt="Next page"
      />
    </Box>
  );
};

export default PaginationNavbar;
