import './DefaultBackButton.scss';
import { NavigationButtonComponent } from '@/types/index';

export const DefaultBackButton: NavigationButtonComponent = ({ onClick }) => (
  <button className="nm--default-back-button" onClick={onClick}>
    <strong>{'<'}</strong>
  </button>
);
