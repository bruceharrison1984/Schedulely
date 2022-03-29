import { HeaderComponent } from '@/types/index';

/**
 * The default header representation
 * @param {HeaderProps}
 * @returns DefaultHeader component
 */
export const DefaultHeader: HeaderComponent = ({
  month,
  year,
  onNextMonth,
  onNextYear,
  onPrevMonth,
  onPrevYear,
}) => (
  <div className="schedulely--header-layout">
    <button className="schedulely--header-button" onClick={onPrevMonth}>
      <strong>{'<'}</strong>
    </button>
    <button className="schedulely--header-button" onClick={onPrevYear}>
      <strong>{'<<'}</strong>
    </button>
    <h1 className="schedulely--header-banner">
      {month} - {year}
    </h1>
    <button className="schedulely--header-button" onClick={onNextYear}>
      <strong>{'>>'}</strong>
    </button>
    <button className="schedulely--header-button" onClick={onNextMonth}>
      <strong>{'>'}</strong>
    </button>
  </div>
);
