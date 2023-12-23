import React, { type FunctionComponent } from 'react';
import { motion } from 'framer-motion';
import { DefaultTooltip } from '../Tooltip/DefaultTooltip';
import { type Settings } from '../../models/const';
import { WidgetContainer } from './WidgetContainer';
interface SettingsPageProps {
  settings: Settings;
  setSettings: (settings: Settings) => void;
  autoSize: boolean;
  onClose?: () => void;
}
export const SettingsPage: FunctionComponent<SettingsPageProps> = ({ settings, setSettings, onClose, autoSize }) => {
  const slippage = settings.slippage ?? 0.01;

  const slippageOptions = [0.01, 0.02, 0.05];

  const handleSlippageClick = (value: number): void => {
    setSettings({ ...settings, slippage: value });
  };

  const handleSlippageChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSettings({ ...settings, slippage: parseFloat(event.target.value) });
  };

  return (
    <WidgetContainer autoSize={autoSize}>
      <div className='flex flex-row justify-between items-center'>
        <p className='text-white font-manrope font-medium text-xl'>Settings</p>
        <div className='p-2 hover:bg-shadow-element hover:rounded-lg cursor-pointer' onClick={onClose}>
          <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' fill='none'>
            <path
              fill='#fff'
              fillRule='evenodd'
              d='M6.854 3.146a.5.5 0 0 1 0 .708L3.707 7H12.5a.5.5 0 0 1 0 1H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708 0Z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 50 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5, type: 'spring', bounce: 0.3 }}
      >
        <div className='flex flex-col gap-2'>
          <div className='flex flex-row items-center gap-2'>
            <p className={'text-white font-manrope text-md font-medium'}>Slippage</p>
            <DefaultTooltip label='Acceptable range to complete transaction.' side='right'>
              <svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' fill='none'>
                <g clipPath='url(#a)'>
                  <path
                    fill='#746F6F'
                    fillRule='evenodd'
                    d='M.819 7A6.181 6.181 0 1 1 13.18 7 6.181 6.181 0 0 1 .82 7Zm6.18-5.295a5.295 5.295 0 1 0 0 10.59 5.295 5.295 0 0 0 0-10.59ZM7.7 9.8a.7.7 0 1 1-1.4 0 .7.7 0 0 1 1.4 0ZM5.648 5.833c0-.632.546-1.236 1.353-1.236.807 0 1.353.604 1.353 1.236 0 .459-.252.693-.686.957a9.98 9.98 0 0 1-.164.097c-.171.099-.374.217-.527.336-.226.176-.49.46-.49.897a.513.513 0 0 0 1.027.004v-.001a.413.413 0 0 1 .094-.09c.095-.074.2-.136.341-.217.073-.042.156-.09.252-.149.499-.303 1.18-.804 1.18-1.834C9.38 4.6 8.34 3.57 7 3.57c-1.34 0-2.38 1.03-2.38 2.263a.513.513 0 1 0 1.027 0Z'
                    clipRule='evenodd'
                  />
                </g>
                <defs>
                  <clipPath id='a'>
                    <path fill='#fff' d='M0 0h14v14H0z' />
                  </clipPath>
                </defs>
              </svg>
            </DefaultTooltip>
          </div>
          <div className='flex flex-col gap-2'>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5, ease: 'easeInOut' }}
            >
              <input
                className='bg-component-background border-1 border-border-color p-2 rounded-lg w-full text-white placeholder-unselected-text font-Manrope'
                value={slippage}
                onChange={handleSlippageChange}
                type='number'
                step='0.01'
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5, ease: 'easeInOut' }}
            >
              <div className='flex flex-row justify-between'>
                {slippageOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`flex w-[30%] items-center justify-center rounded-lg border-1 ${
                      slippage === option ? 'border-hover-green' : 'border-border-color'
                    } bg-component-background cursor-pointer hover:bg-shadow-element p-2`}
                    onClick={() => {
                      handleSlippageClick(option);
                    }}
                  >
                    <p className='font-manrope text-unselected-text rounded-lg font-medium'>{option * 100}%</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </WidgetContainer>
  );
};
