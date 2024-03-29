import { ActionContext } from '@/providers/ActionProvider';
import { useContext } from 'react';

export const useActions = () => {
  const actions = useContext(ActionContext);
  if (!actions)
    throw new Error('useActions must be used within ActionProvider');
  return actions;
};
