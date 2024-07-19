import LanguageSystem from '@/lang';
import Image from 'next/image';
import React from 'react';

// define the source of the logo image
const logoSrc = '/todo-logo.svg';

/**
 * `LogoProps` interface.
 * This interface defines the props for the `Logo` component.
 *
 * @interface
 * @property {number} size - The size of the logo.
 */
interface LogoProps {
  size: number;
}

/**
 * `Logo` component.
 * This component renders the logo of the application.
 *
 * @param {LogoProps} props - The props for the `Logo` component.
 *
 * @returns {JSX.Element} The rendered `Logo` component.
 */
const Logo: React.FC<LogoProps> = ({ size }: LogoProps): JSX.Element => (
  <Image
    style={{ marginBottom: '-8px' }} // not the best to align items, but simple and fast : )
    width={size}
    height={size}
    src={logoSrc}
    alt={LanguageSystem.getTranslation('logoName')}
  />
);

export default Logo;
