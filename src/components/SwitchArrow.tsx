import React, { type ReactNode, useState, type FunctionComponent } from 'react';
import { motion } from 'framer-motion';
import { type WidgetTheme } from '../models/const';

interface SwitchArrowProps {
  onClick: () => void;
  theme?: WidgetTheme;
}

export const SwitchArrow: FunctionComponent<SwitchArrowProps> = ({ onClick, theme }): ReactNode => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const variants = {
    clicked: { rotate: 180 },
    notClicked: { rotate: 0 },
  };

  return (
    <motion.div
      className={'absolute top-[43.5%] left-[47%] transform'}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={() => {
        onClick();
        setIsClicked(!isClicked);
      }}
      variants={variants}
      animate={isClicked ? 'clicked' : 'notClicked'}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <svg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <rect x='1.5' y='1.5' width='37' height='37' rx='7.5' fill={theme === 'light' ? '#F3F4F6' : '#111111'} />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M15.1465 14.1465C15.3417 13.9512 15.6583 13.9512 15.8536 14.1465L19.8536 18.1465C20.0488 18.3417 20.0488 18.6583 19.8536 18.8536C19.6583 19.0488 19.3417 19.0488 19.1464 18.8536L16 15.7071V24.5C16 24.7761 15.7761 25 15.5 25C15.2239 25 15 24.7761 15 24.5V15.7071L11.8536 18.8536C11.6583 19.0488 11.3417 19.0488 11.1465 18.8536C10.9512 18.6583 10.9512 18.3417 11.1465 18.1465L15.1465 14.1465Z'
          fill={theme === 'light' ? 'black' : 'white'}
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M24.5 14C24.7761 14 25 14.2239 25 14.5V23.2929L28.1464 20.1465C28.3417 19.9512 28.6583 19.9512 28.8536 20.1465C29.0488 20.3417 29.0488 20.6583 28.8536 20.8535L24.8536 24.8536C24.7598 24.9473 24.6326 25 24.5 25C24.3674 25 24.2402 24.9473 24.1465 24.8536L20.1465 20.8535C19.9512 20.6583 19.9512 20.3417 20.1465 20.1465C20.3417 19.9512 20.6583 19.9512 20.8536 20.1465L24 23.2929V14.5C24 14.2239 24.2239 14 24.5 14Z'
          fill={theme === 'light' ? 'black' : 'white'}
        />
        <rect
          x='1.5'
          y='1.5'
          width='37'
          height='37'
          rx='7.5'
          stroke={isHovered ? (theme === 'light' ? 'black' : 'white') : theme === 'light' ? '#E5E7EB' : 'black'}
          strokeWidth='2'
        />{' '}
      </svg>
    </motion.div>
  );
};
