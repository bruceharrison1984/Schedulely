import { NavigationButtonComponent } from '@/types/index';

export const DefaultForwardButton: NavigationButtonComponent = ({
  onClick,
}) => (
  <button className="schedulely--default-forward-button" onClick={onClick}>
    <strong>{'>'}</strong>
  </button>
);
