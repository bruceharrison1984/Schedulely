import { HeaderComponent } from '@/types';
import { HeaderLayout } from '@/layouts';
import { render } from '@testing-library/react';

const mockHeaderComponent: HeaderComponent = () => <div>HEADER COMPONENT</div>;

jest.mock('@/hooks', () => ({
  useComponents: jest.fn(() => ({
    headerComponent: mockHeaderComponent,
  })),
  useCalendar: jest.fn(() => ({})),
  useBreakpoint: jest.fn(() => ({})),
}));

describe('HeaderLayout', () => {
  const testObject = render(<HeaderLayout />);

  it('uses custom header component', () => {
    expect(testObject.getByText('HEADER COMPONENT')).toBeTruthy();
  });
});
