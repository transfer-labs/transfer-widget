import React, { type FunctionComponent } from 'react';
import { DefaultTooltip } from '../Tooltip/DefaultTooltip';
import { ClockIcon } from '@radix-ui/react-icons';

export interface RouteDetailsProps {
  gas?: string; // Estimated gas fee for the route if 'selected' status
  fees?: string; // Estimated fee for the the route if 'selected' status
  time?: string; // Estimated time for the route if 'selected' status
  steps?: number; // Estimated number of steps a route has to take if 'selected' status
}

interface InfoProps {
  value?: string | number;
  side?: 'left' | 'right' | 'top' | 'bottom';
  color?: string;
}

export const GasInfo: FunctionComponent<InfoProps> = ({
  value = '0.0',
  side = 'bottom',
  color = 'unselected-text',
}) => {
  return (
    <>
      <DefaultTooltip label='Estimated gas price' side={side}>
        <div className='flex flex-row gap-1 items-center justify-center'>
          <svg width='12' height='12' className={`text-${color} fill-current`}>
            <g clipPath='url(#a)'>
              <path d='m10.927 1.573-1-1a.25.25 0 1 0-.354.354l.823.823-.823.823a.25.25 0 0 0-.073.177v.75c0 .552.449 1 1 1v4.25a.25.25 0 0 1-.5 0v-.5a.75.75 0 0 0-.75-.75H9V1c0-.552-.448-1-1-1H3c-.551 0-1 .448-1 1v9c-.552 0-1 .448-1 1v.75c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25V11c0-.552-.448-1-1-1V8h.25a.25.25 0 0 1 .25.25v.5a.75.75 0 0 0 1.5 0v-7a.25.25 0 0 0-.073-.177ZM8 4.255a.25.25 0 0 1-.25.25h-4.5a.25.25 0 0 1-.25-.25V1.25A.25.25 0 0 1 3.25 1h4.5a.25.25 0 0 1 .25.25v3.005Z' />
            </g>
            <defs>
              <clipPath id='a'>
                <path fill='#fff' d='M0 0h12v12H0z' />
              </clipPath>
            </defs>
          </svg>
          <p className={'text-unselected-text font-manrope text-sm font-small'}>${value}</p>
        </div>
      </DefaultTooltip>
    </>
  );
};

export const FeeInfo: FunctionComponent<InfoProps> = ({
  value = '0.0',
  side = 'bottom',
  color = 'unselected-text',
}) => {
  return (
    <>
      <DefaultTooltip label='Fee from route providers' side={side}>
        <div className={`flex flex-row gap-1 items-center justify-center text-${color}`}>
          <svg xmlns='http://www.w3.org/2000/svg' width='12' height='13' className={`text-${color} fill-current`}>
            <path
              fillRule='evenodd'
              d='M6 12.5a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm-.292-3.936v.533h.627v-.523c.2-.024.38-.073.543-.149.236-.112.42-.266.55-.462a1.22 1.22 0 0 0 .197-.693c0-.302-.08-.544-.243-.726-.162-.182-.425-.327-.789-.435l-.795-.231c-.22-.066-.38-.145-.483-.237a.436.436 0 0 1-.153-.336c0-.12.036-.227.108-.321a.715.715 0 0 1 .297-.222c.126-.054.268-.079.426-.075.168.002.32.036.453.102a.94.94 0 0 1 .513.684l.64-.114a1.644 1.644 0 0 0-.304-.678 1.413 1.413 0 0 0-.546-.432 1.668 1.668 0 0 0-.414-.126v-.54h-.627v.528a1.642 1.642 0 0 0-.48.135 1.2 1.2 0 0 0-.513.432c-.12.186-.18.405-.18.657 0 .534.3.894.9 1.08l1.014.312c.196.062.337.138.423.228a.48.48 0 0 1 .132.351.599.599 0 0 1-.258.498c-.17.13-.39.195-.663.195-.274 0-.509-.075-.705-.225a1.052 1.052 0 0 1-.384-.612l-.62.099c.045.272.143.508.293.708.152.198.346.351.582.459.142.065.295.11.46.136Z'
              clipRule='evenodd'
            />
          </svg>

          <p className={`text-${color} font-manrope text-sm font-small`}>${value}</p>
        </div>
      </DefaultTooltip>
    </>
  );
};

export const TimeInfo: FunctionComponent<InfoProps> = ({ value = '0', side = 'bottom', color = 'unselected-text' }) => {
  return (
    <>
      <DefaultTooltip label='Estimated time for transaction' side={side}>
        <div className='flex flex-row gap-1 items-center justify-center'>
          <div className={`text-${color}`}>
            <ClockIcon />
          </div>
          <p className={`text-${color} font-manrope text-sm font-small`}>{value}</p>
        </div>
      </DefaultTooltip>
    </>
  );
};

const StepsInfo: FunctionComponent<InfoProps> = ({ value = '0', side = 'bottom', color = 'unselected-text' }) => {
  return (
    <>
      <DefaultTooltip label='# of steps in route' side='bottom'>
        <div className='flex flex-row gap-1 items-center justify-center'>
          <svg width='14' height='14' viewBox='0 0 64 65' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              d='M0 50.0595V64.395C0 64.453 0.0470097 64.5 0.105 64.5H63.895C63.953 64.5 64 64.453 64 64.395V0.605C64 0.54701 63.953 0.5 63.895 0.5H46.6505C46.5925 0.5 46.5455 0.54701 46.5455 0.605V17.8495C46.5455 17.9075 46.4984 17.9545 46.4405 17.9545H32.105C32.047 17.9545 32 18.0016 32 18.0595V32.395C32 32.453 31.953 32.5 31.895 32.5H14.6505C14.5925 32.5 14.5455 32.547 14.5455 32.605V49.8495C14.5455 49.9075 14.4984 49.9545 14.4405 49.9545H0.105C0.0470101 49.9545 0 50.0016 0 50.0595Z'
              fill='#746F6F'
            />
          </svg>

          <p className={'text-unselected-text font-manrope text-sm font-small'}>{value}</p>
        </div>
      </DefaultTooltip>
    </>
  );
};

export const RouteDetails: FunctionComponent<RouteDetailsProps> = ({ gas, fees, time, steps }) => {
  return (
    <div className='flex flex-row justify-between w-full items-center'>
      <GasInfo value={gas} />
      <FeeInfo value={fees} />
      <TimeInfo value={time} />
      <StepsInfo value={steps} />
    </div>
  );
};
