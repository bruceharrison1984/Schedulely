import './HeaderLayout.scss';
import { useCalendar, useComponents } from '@/hooks/index';

/**
 * This component controls the layout of the header that display the controls and the current month/year description
 * @returns HeaderLayout component
 */
export const HeaderLayout = () => {
  const { currentMonth, onNextMonth, onPrevMonth, dateAdapter } = useCalendar();

  const {
    forwardNavigationButtonComponent: ForwardNavigationButton,
    backwardNavigationButtonComponent: BackNavigationButton,
    headerBannerComponent: HeaderBanner,
  } = useComponents();

  return (
    <div className="nm--header-layout">
      <BackNavigationButton onClick={onPrevMonth} />
      <HeaderBanner
        month={dateAdapter.getMonthName(currentMonth)}
        year={dateAdapter.getYear(currentMonth)}
      />
      <ForwardNavigationButton onClick={onNextMonth} />
    </div>
  );
};
