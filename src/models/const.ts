export type Direction = 'to' | 'from';

export const Error = {
  default: {
    description: 'Something went wrong. Please try again.',
  },
  gas: {
    description: 'You do not have enough funds to pay for gas.',
  },
  retrieving_bridge_routes: {
    description: 'Error retrieving bridge routes.',
  },
};

export type ErrorType = keyof typeof Error;
