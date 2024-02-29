import React, { type FunctionComponent } from 'react';
import { type WidgetTheme } from '../../models/const';

export const BestRouteIcon: FunctionComponent<{ theme: WidgetTheme }> = ({ theme }) => {
  return (
    <div
      className={`w-[45px] ${
        theme === 'light' ? 'bg-[#57FFC0] text-[#2A4239]' : 'bg-[#2A4239] text-[#57FFC0]'
      } rounded text-center text-sm flex items-center justify-center`}
    >
      Best
    </div>
  );
};
