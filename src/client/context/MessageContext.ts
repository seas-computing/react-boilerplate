import { createContext, Context } from 'react';

/**
 * Global message provider
 */

export const MessageContext: Context<Function> = createContext(null);
