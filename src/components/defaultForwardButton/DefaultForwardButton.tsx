import './DefaultForwardButton.scss';
import { NavigationButtonComponent } from '@/types/index';

export const DefaultForwardButton: NavigationButtonComponent = ({
  onClick,
}) => (
  <button className="calendo--default-forward-button" onClick={onClick}>
    <strong>{'>'}</strong>
  </button>
);
