import { BreakpointContext } from '@/providers/BreakPointProvider';
import { useContext } from 'react';

export const useBreakpoint = () => {
  const highlight = useContext(BreakpointContext);
  if (!highlight)
    throw new Error('useBreakpoint must be used within BreakpointProvider');
  return highlight;
};
