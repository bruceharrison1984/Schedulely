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
    <button
      className="schedulely--header-button"
      title="Previous Month"
      onClick={onPrevMonth}
    >
      <strong>{'‹'}</strong>
    </button>
    <button
      className="schedulely--header-button"
      title="Previous Year"
      onClick={onPrevYear}
    >
      <strong>{'«'}</strong>
    </button>
    <h2 className="schedulely--header-banner">
      {month} - {year}
    </h2>
    <button
      className="schedulely--header-button"
      title="Next Year"
      onClick={onNextYear}
    >
      <strong>{'»'}</strong>
    </button>
    <button
      className="schedulely--header-button"
      title="Next Month"
      onClick={onNextMonth}
    >
      <strong>{'›'}</strong>
    </button>
  </div>
);
