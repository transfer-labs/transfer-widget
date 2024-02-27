import React, { type FunctionComponent, useState } from 'react';
import { motion } from 'framer-motion';
import { DefaultTooltip } from '../Tooltip/DefaultTooltip';
import { type WidgetTheme } from '../../models/const';

interface FlipArrowIconProps {
  tooltipText?: string;
  isClicked: boolean;
  setIsClicked: (isClicked: boolean) => void;
  theme: WidgetTheme;
}

export const FlipArrowIcon: FunctionComponent<FlipArrowIconProps> = ({
  tooltipText,
  isClicked,
  setIsClicked,
  theme,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
      <div
        onMouseEnter={() => {
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsHovered(false);
        }}
        onClick={() => {
          setIsClicked(!isClicked);
        }}
        style={{
          transition: 'transform 0.3s ease-in-out',
          transform: isClicked ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      >
        <DefaultTooltip label={tooltipText} side='left' isHidden={isClicked}>
          <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <rect x='0.5' y='0.5' width='29' height='29' rx='8.5' fill={theme === 'light' ? '#FBFBFB' : '#242424'} />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M14.5 10C14.7761 10 15 10.2239 15 10.5V19.2929L18.1464 16.1465C18.3417 15.9512 18.6583 15.9512 18.8536 16.1465C19.0488 16.3417 19.0488 16.6583 18.8536 16.8535L14.8536 20.8536C14.7598 20.9473 14.6326 21 14.5 21C14.3674 21 14.2402 20.9473 14.1465 20.8536L10.1465 16.8535C9.95118 16.6583 9.95118 16.3417 10.1465 16.1465C10.3417 15.9512 10.6583 15.9512 10.8536 16.1465L14 19.2929V10.5C14 10.2239 14.2239 10 14.5 10Z'
              fill={theme === 'light' ? '#000000' : 'white'}
            />
            <rect
              x='0.5'
              y='0.5'
              width='29'
              height='29'
              rx='8.5'
              stroke={isHovered ? (theme === 'light' ? 'black' : 'white') : theme === 'light' ? '#E5E7EB' : '#2A2A2E'}
            />
          </svg>
        </DefaultTooltip>
      </div>
    </motion.div>
  );
};
