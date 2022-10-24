import { HeaderComponent } from '@/types/index';
import { useCallback } from 'react';

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
  componentSize,
}) => {
  const fontSize = useCallback(() => {
    if (componentSize === 'large') return '1.5em';
    if (componentSize === 'medium') return '1.3em';
    return '1.1em';
  }, [componentSize]);

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
        <span
          role={'heading'}
          className="header-text"
          style={{ fontSize: fontSize() }}
        >
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
