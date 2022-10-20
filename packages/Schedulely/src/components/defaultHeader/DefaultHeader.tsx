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
        role={'button'}
        className="header-button"
        title="Previous Month"
        onClick={onPrevMonth}
      >
        <strong>{'‹'}</strong>
      </button>
      <button
        role={'button'}
        className="header-button"
        title="Previous Year"
        onClick={onPrevYear}
      >
        <strong>{'«'}</strong>
      </button>

      <div role={'banner'} className="header-banner">
        <span role={'heading'} className="header-text">
          {month} - {year}
        </span>
        {isCurrentMonth && (
          <div
            role={'alert'}
            className="current-month-indicator"
            title="Current Month"
          />
        )}
      </div>

      <button
        role={'button'}
        className="header-button"
        title="Next Year"
        onClick={onNextYear}
      >
        <strong>{'»'}</strong>
      </button>
      <button
        role={'button'}
        className="header-button"
        title="Next Month"
        onClick={onNextMonth}
      >
        <strong>{'›'}</strong>
      </button>
    </div>
  );
};
