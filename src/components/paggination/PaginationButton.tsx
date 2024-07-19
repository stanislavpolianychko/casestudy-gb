import React from 'react';
import { IconButton } from '@mui/material';
import Image from 'next/image';

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
 * PaginationButtonProps component props
 */
interface PaginationButtonProps {
  onClick: () => void;
  disabled: boolean;
  src: string;
  alt: string;
}

/**
 * PaginationButton component
 * @param {PaginationButtonProps} props - Component props
 * @returns {JSX.Element} - PaginationButton component
 */
const PaginationButton: React.FC<PaginationButtonProps> = ({
  onClick,
  disabled,
  src,
  alt,
}: PaginationButtonProps): JSX.Element => (
  <IconButton onClick={onClick} disabled={disabled}>
    <Image src={src} alt={alt} height={15} width={15} />
  </IconButton>
);

export default PaginationButton;
