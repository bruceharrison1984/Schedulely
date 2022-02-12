import { JSXElementConstructor } from 'react';

/** Props used when creating a NavigationButton */
export interface NavigationButtonComponentProps {
  /** Action taken when button is clicked */
  onClick: () => void;
  children?: JSX.Element | JSX.Element[];
}

/** Button used for forward/backward navigation of months */
export type NavigationButtonComponent =
  JSXElementConstructor<NavigationButtonComponentProps>;
