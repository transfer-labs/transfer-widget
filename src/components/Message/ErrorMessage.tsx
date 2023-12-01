import React, { type ReactNode, type FunctionComponent } from 'react';
import { type ErrorType, Error } from '../../models/const';
export interface ErrorMessageProps {
  errorType?: ErrorType;
}

const GasIcon = (): ReactNode => {
  return (
    <svg width='12' height='13' viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1646_14078)'>
        <path
          d='M10.9267 2.07324L9.92673 1.07323C9.82906 0.97557 9.67086 0.97557 9.57322 1.07323C9.47556 1.1709 9.47556 1.3291 9.57322 1.42674L10.3965 2.24998L9.57322 3.07323C9.52635 3.1201 9.49998 3.18357 9.49998 3.24999V3.99999C9.49998 4.55152 9.94848 5 10.5 5V9.24999C10.5 9.38792 10.3879 9.5 10.25 9.5C10.112 9.5 9.99997 9.38795 9.99997 9.24999V8.75C9.99997 8.33642 9.66355 8 9.24997 8H8.99999V1.50001C8.99999 0.948477 8.55151 0.5 7.99998 0.5H2.99999C2.44848 0.5 1.99998 0.948477 1.99998 1.50001V10.5C1.44847 10.5 0.999969 10.9485 0.999969 11.5V12.25C0.999969 12.3882 1.11179 12.5 1.24998 12.5H9.74999C9.88817 12.5 9.99999 12.3882 9.99999 12.25V11.5C9.99999 10.9485 9.55152 10.5 8.99999 10.5V8.50002H9.24999C9.38792 8.50002 9.5 8.61207 9.5 8.75002V9.25002C9.5 9.66359 9.83642 10 10.25 10C10.6636 10 11 9.66359 11 9.25002V2.25001C11 2.18359 10.9736 2.12012 10.9267 2.07324ZM7.99998 4.75463C7.99998 4.89282 7.88816 5.00464 7.74997 5.00464H3.24997C3.11178 5.00464 2.99996 4.89282 2.99996 4.75463V1.74999C2.99996 1.6118 3.11178 1.49998 3.24997 1.49998H7.74997C7.88816 1.49998 7.99998 1.6118 7.99998 1.74999V4.75463Z'
          fill='#DB6666'
        />
      </g>
      <defs>
        <clipPath id='clip0_1646_14078'>
          <rect width='12' height='12' fill='white' transform='translate(0 0.5)' />
        </clipPath>
      </defs>
    </svg>
  );
};

export const ErrorMessage: FunctionComponent<ErrorMessageProps> = ({ errorType = 'default' }) => {
  const errorMessage = errorType in Error ? Error[errorType].description : Error.default.description;
  return (
    <div className='flex flex-row justify-center items-center bg-component-bg border-1 border-border-color rounded-lg px-2 py-2 gap-1'>
      {errorType === 'gas' ? <GasIcon /> : null}
      <p className='font-manrope text-sm text-failure-red'>{errorMessage}</p>
    </div>
  );
};
