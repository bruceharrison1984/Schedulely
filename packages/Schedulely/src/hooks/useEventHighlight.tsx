import { HighlightContext } from '@/providers/HightlightProvider';
import { useContext } from 'react';

export const useEventHighlight = () => {
  const highlight = useContext(HighlightContext);
  if (!highlight)
    throw new Error('useHighlight must be used within HighlightProvider');
  return highlight;
};
