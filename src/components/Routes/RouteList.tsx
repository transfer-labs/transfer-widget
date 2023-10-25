import React, { type FunctionComponent } from 'react';
import Route, { type RouteProps } from './Route';

export interface RoutesProps {
  routeprops: RouteProps;
  status: 'default' | 'selected' | 'error' | 'gas-error';
}

export const RouteList: FunctionComponent<RoutesProps> = ({ routeprops, status }) => {
  if (status === 'default') {
    return null;
  } else {
    return (
      <div className='flex flex-col gap-3 w-full'>
        <div className='flex flex-row justify-between w-full items-center justify-center'>
          <p className={'text-white font-manrope text-lg font-medium'}>Routes</p>
          <a className='cursor-pointer'>
            <p className={'text-accent-color font-manrope text-sm font-medium'}>View Additional</p>
          </a>
        </div>
        <Route {...routeprops} />
      </div>
    );
  }
};
