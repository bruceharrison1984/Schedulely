import { NavigationButtonComponent } from '@/types/index';

export const DefaultBackButton: NavigationButtonComponent = ({ onClick }) => (
  <button className="schedulely--default-back-button" onClick={onClick}>
    <strong>{'<'}</strong>
  </button>
);
