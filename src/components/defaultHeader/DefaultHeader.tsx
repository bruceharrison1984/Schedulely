import { HeaderComponent } from '@/types/index';

export const DefaultBackButton: HeaderComponent = ({
  month,
  year,
  onNextMonth,
  onNextYear,
  onPrevMonth,
  onPrevYear,
}) => (
  <div className="schedulely--header-layout">
    <button className="schedulely--default-button" onClick={onPrevMonth}>
      <strong>{'<'}</strong>
    </button>
    <button className="schedulely--default-button" onClick={onPrevYear}>
      <strong>{'<<'}</strong>
    </button>
    <h1 className="schedulely--default-header-banner">
      {month} - {year}
    </h1>
    <button className="schedulely--default-button" onClick={onNextYear}>
      <strong>{'>>'}</strong>
    </button>
    <button className="schedulely--default-button" onClick={onNextMonth}>
      <strong>{'>'}</strong>
    </button>
  </div>
);
