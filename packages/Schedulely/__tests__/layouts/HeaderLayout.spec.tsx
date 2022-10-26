import { BreakpointProvider, ComponentProvider } from '@/providers';
import { HeaderLayout } from '@/layouts';
import { getCalendarProviderProps } from '../testHelpers/component.testHelper';
import { render } from '@testing-library/react';
import { useCalendar } from '../../src/hooks/useCalendar';
import React from 'react';

jest.mock('../../src/hooks/useCalendar');
const mockUseCalendar = useCalendar as jest.MockedFunction<typeof useCalendar>;
const hook = getCalendarProviderProps({});

describe('HeaderLayout', () => {
  mockUseCalendar.mockReturnValue(hook);

  const testObject = render(
    <BreakpointProvider containerRef={React.createRef()}>
      <ComponentProvider>
        <HeaderLayout />
      </ComponentProvider>
    </BreakpointProvider>
  );
  it('skip', () => {
    expect(true).toBe(true);
  });
});
