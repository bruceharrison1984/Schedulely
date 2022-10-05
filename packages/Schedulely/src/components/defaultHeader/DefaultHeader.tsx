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
  isCurrentMonth,
}) => {
  return (
    <div className="header-layout">
      <button
        className="header-button"
        title="Previous Month"
        onClick={onPrevMonth}
      >
        <strong>{'‹'}</strong>
      </button>
      <button
        className="header-button"
        title="Previous Year"
        onClick={onPrevYear}
      >
        <strong>{'«'}</strong>
      </button>

      <div className="header-banner">
        <h2 className="header-text" style={{ display: 'inline-block' }}>
          {month} - {year}
          {isCurrentMonth && (
            <div className="current-month-indicator" title="Current Month" />
          )}
        </h2>
      </div>

      <button className="header-button" title="Next Year" onClick={onNextYear}>
        <strong>{'»'}</strong>
      </button>
      <button
        className="header-button"
        title="Next Month"
        onClick={onNextMonth}
      >
        <strong>{'›'}</strong>
      </button>
    </div>
  );
};
