import { createContext } from 'react';

import type { TConfirmFn } from './types';

export const ConfirmContext = createContext<TConfirmFn | null>(null);
