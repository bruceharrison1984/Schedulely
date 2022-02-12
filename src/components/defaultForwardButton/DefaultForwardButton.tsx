import './DefaultForwardButton.scss';
import { NavigationButtonComponent } from '@/types/index';

export const DefaultForwardButton: NavigationButtonComponent = ({
  onClick,
}) => (
  <button className="nm--default-forward-button" onClick={onClick}>
    <strong>{'>'}</strong>
  </button>
);
