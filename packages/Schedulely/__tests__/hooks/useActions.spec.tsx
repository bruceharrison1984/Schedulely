import { ActionProvider } from '@/providers';
import { Chance } from 'chance';
import { InternalCalendarEvent } from '@/types';
import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useActions } from '@/hooks';
import { vi } from 'vitest';

const testEvents: InternalCalendarEvent[] = [
  {
    id: '123-abc',
    start: new Date(),
    end: new Date(),
    summary: 'testEvent',
    color: 'red',
    visible: false,
  },
];

const onEventClickHandler = vi.fn((event: InternalCalendarEvent) => null);
let onMonthChangeClickHandler = vi.fn(
  (firstOfMonth: Date, lastOfMonth: Date) => null
);
let onMoreEventsClickHandler = vi.fn((event: InternalCalendarEvent[]) => null);
let onDayClickHandler = vi.fn((day: Date) => null);

const wrapper = ({ children }: { children: ReactNode }) => (
  <ActionProvider
    actions={{
      onEventClick: onEventClickHandler,
      onMonthChangeClick: onMonthChangeClickHandler,
      onMoreEventsClick: onMoreEventsClickHandler,
      onDayClick: onDayClickHandler,
    }}
  >
    {children}
  </ActionProvider>
);

describe('useActions', () => {
  const {
    result: {
      current: {
        onEventClick,
        onMonthChangeClick,
        onMoreEventsClick,
        onDayClick,
      },
    },
  } = renderHook(() => useActions(), { wrapper });

  describe('onDayClick', () => {
    const testDate = Chance().date();
    onDayClick(testDate);

    it('invokes correct function', () => {
      expect(onDayClickHandler).toHaveBeenCalled();
    });

    it('passes correct args', () =>
      expect(onDayClickHandler.mock.calls[0][0]).toEqual(testDate));
  });

  describe('onEventClick', () => {
    onEventClick(testEvents[0]);

    it('invokes correct function', () => {
      expect(onEventClickHandler).toHaveBeenCalled();
    });

    it('passes correct args', () =>
      expect(onEventClickHandler.mock.calls[0][0]).toEqual(testEvents[0]));
  });

  describe('onMonthChangeClick', () => {
    const monthStart = new Date(2000, 1, 1);
    const monthEnd = new Date(2000, 2, 1);

    onMonthChangeClick(monthStart, monthEnd);

    it('invokes correct function', () => {
      expect(onMonthChangeClickHandler).toHaveBeenCalled();
    });

    it('passes correct args', () => {
      expect(onMonthChangeClickHandler.mock.calls[0][0]).toEqual(monthStart);
      expect(onMonthChangeClickHandler.mock.calls[0][1]).toEqual(monthEnd);
    });
  });

  describe('onMoreEventClick', () => {
    describe('when defined', () => {
      onMoreEventsClick(testEvents);

      it('invokes correct function', () => {
        expect(onMoreEventsClickHandler).toHaveBeenCalled();
      });

      it('passes correct args', () =>
        expect(onMoreEventsClickHandler.mock.calls[0][0]).toEqual(testEvents));
    });
  });

  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useActions).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });

  describe('if Action undefined', () => {
    const emptyWrapper = ({ children }: { children: ReactNode }) => (
      <ActionProvider>{children}</ActionProvider>
    );

    const {
      result: {
        current: { onEventClick, onMonthChangeClick, onMoreEventsClick },
      },
    } = renderHook(() => useActions(), { wrapper: emptyWrapper });

    beforeEach(() => {
      onMoreEventsClickHandler.mockClear();
      onEventClickHandler.mockClear();
      onMonthChangeClickHandler.mockClear();
    });

    it('does not invoke onMoreEventClick if not defined', () => {
      onMoreEventsClick(testEvents);
      expect(onMoreEventsClickHandler).not.toHaveBeenCalled();
    });

    it('does not invoke onEventClick if not defined', () => {
      onEventClick(testEvents[0]);
      expect(onEventClickHandler).not.toHaveBeenCalled();
    });

    it('does not invoke onMonthChangeClick if not defined', () => {
      onMonthChangeClick(new Date(), new Date());
      expect(onMonthChangeClickHandler).not.toHaveBeenCalled();
    });
  });
});
