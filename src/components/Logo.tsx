import React from 'react';
import Image from 'next/image';
import LanguageSystem from '@/lang';

const logoSrc = '/todo-logo.svg';

const Logo: React.FC<{ size: number }> = ({ size }) => (
  <Image
    width={size}
    height={size}
    src={logoSrc}
    alt={LanguageSystem.getTranslation('logoName')}
    style={{ maxWidth: size, maxHeight: size }}
  />
);

export default Logo;
