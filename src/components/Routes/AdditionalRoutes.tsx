import React, { type FunctionComponent } from 'react';
import { type SupportedChain, type SupportedToken } from '@argoplatform/transfer-sdk';
import { areRoutesEqual } from '../../lib/transfer';
import { type WidgetState, type WidgetTheme } from '../../models/const';
import { Route } from './Route';
import { motion, AnimatePresence } from 'framer-motion';
import { type QuoteRoute } from '../../models/transfer';

interface AdditionalRoutesProps {
  routes: QuoteRoute[];
  fromChain?: SupportedChain;
  toChain?: SupportedChain;
  fromToken?: SupportedToken;
  toToken?: SupportedToken;
  widgetState: WidgetState;
  setSelectedRoute: (route: QuoteRoute | undefined) => void;
  selectedRoute?: QuoteRoute;
  theme: WidgetTheme;
}

export const AdditionalRoutes: FunctionComponent<AdditionalRoutesProps> = ({
  routes,
  fromChain,
  toChain,
  fromToken,
  toToken,
  widgetState,
  setSelectedRoute,
  selectedRoute,
  theme,
}) => {
  if (routes.length === 0) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className='flex w-full justify-center bg-component-background-dark-dark border border-border-color-dark rounded-lg py-3 px-4'>
            <p className={'text-white font-manrope text-sm font-medium '}>No additional bridges</p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <div className='h-[250px] overflow-y-scroll'>
          {routes.map((route, idx) => {
            return (
              <div className='my-2' key={idx}>
                <Route
                  route={route}
                  fromChain={fromChain}
                  toChain={toChain}
                  fromToken={fromToken}
                  toToken={toToken}
                  widgetState={widgetState}
                  setSelectedRoute={setSelectedRoute}
                  isSelectedRoute={areRoutesEqual(route, selectedRoute)}
                  theme={theme}
                />
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
