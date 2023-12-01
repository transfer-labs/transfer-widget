import React, { type FunctionComponent } from 'react';
import { LinkIcon } from './Icons/LinkIcon';

interface LinkTextProps {
  link: string;
  text: string;
}

export const LinkText: FunctionComponent<LinkTextProps> = ({ link, text }) => {
  return (
    <a
      className='text-accent-color font-manrope text-sm font-medium cursor-pointer hover:underline'
      href={link}
      target='_blank'
      rel='noopener noreferrer'
    >
      <div className='flex flex-row gap-2 items-center'>
        {text}
        <LinkIcon />
      </div>
    </a>
  );
};
