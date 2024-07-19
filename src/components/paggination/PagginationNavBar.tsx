import PaginationButton from '@/components/paggination/PaginationButton';
import LanguageSystem from '@/lang';
import React from 'react';
import { Box } from '@mui/material';

const navbarStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  width: {
    xs: '100%',
    sm: '50%',
  },
  margin: '0 auto',
};

/**
 * PaginationNavbarProps component props
 */
interface PaginationNavbarProps {
  page: number;
  hasNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

/**
 * PaginationNavbar component
 * @param {PaginationNavbarProps} props - Component props
 * @returns {JSX.Element} - PaginationNavbar component
 */
const PaginationNavbar: React.FC<PaginationNavbarProps> = ({
  page,
  hasNextPage,
  onPreviousPage,
  onNextPage,
}: PaginationNavbarProps): JSX.Element => {
  return (
    <Box sx={navbarStyles}>
      <PaginationButton
        onClick={onPreviousPage}
        disabled={page === 1}
        src="/nav-left.svg"
        alt={LanguageSystem.getTranslation('prevPage')}
      />
      <PaginationButton
        onClick={onNextPage}
        disabled={!hasNextPage}
        src="/nav-right.svg"
        alt={LanguageSystem.getTranslation('nextPage')}
      />
    </Box>
  );
};

export default PaginationNavbar;
