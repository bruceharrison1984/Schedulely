import { BreakpointProvider, ComponentProvider } from '@/providers';
import { HeaderComponent } from '@/types';
import { HeaderLayout } from '@/layouts';
import { getCalendarProviderProps } from '../testHelpers/component.testHelper';
import { render } from '@testing-library/react';
import { useCalendar } from '../../src/hooks/useCalendar';
import React from 'react';

jest.mock('../../src/hooks/useCalendar');
const mockUseCalendar = useCalendar as jest.MockedFunction<typeof useCalendar>;
const hook = getCalendarProviderProps({});

const testHeaderComponent: HeaderComponent = () => <div>HEADER COMPONENT</div>;

describe('HeaderLayout', () => {
  mockUseCalendar.mockReturnValue(hook);

  const testObject = render(
    <BreakpointProvider containerRef={React.createRef()}>
      <ComponentProvider
        calendarComponents={{ headerComponent: testHeaderComponent }}
      >
        <HeaderLayout />
      </ComponentProvider>
    </BreakpointProvider>
  );

  it('uses custom header component', () => {
    expect(testObject.queryByText('HEADER COMPONENT')).not.toBeNull();
  });
});
