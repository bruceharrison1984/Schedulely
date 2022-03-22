import { useCalendar, useComponents } from '@/hooks/index';
import useKeyboardControls from '@/hooks/useKeyboardControls';

/**
 * This component controls the layout of the header that display the controls and the current month/year description
 * @returns HeaderLayout component
 */
export const HeaderLayout = () => {
  const {
    currentMonth,
    onNextMonth: onSchedulely,
    onPrevMonth,
    dateAdapter,
  } = useCalendar();

  const {
    forwardNavigationButtonComponent: ForwardNavigationButton,
    backwardNavigationButtonComponent: BackNavigationButton,
    headerBannerComponent: HeaderBanner,
  } = useComponents();

  useKeyboardControls();

  return (
    <div className="schedulely--header-layout">
      <BackNavigationButton onClick={onPrevMonth} />
      <HeaderBanner
        month={dateAdapter.getMonthName(currentMonth)}
        year={dateAdapter.getYear(currentMonth)}
      />
      <ForwardNavigationButton onClick={onSchedulely} />
    </div>
  );
};
