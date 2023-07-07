import { RenderResult, fireEvent, render } from '@testing-library/react';
import { useKeyboardControls } from '@/hooks/useKeyboardControls';
import { vi } from 'vitest';

const mockOnNextMonth = vi.fn();
const mockOnPrevMonth = vi.fn();
const mockOnNextYear = vi.fn();
const mockOnPrevYear = vi.fn();
vi.mock('@/hooks/useCalendar', () => ({
  useCalendar: vi.fn(() => ({
    onNextMonth: mockOnNextMonth,
    onPrevMonth: mockOnPrevMonth,
    onNextYear: mockOnNextYear,
    onPrevYear: mockOnPrevYear,
  })),
}));

const TestWrapper = () => {
  useKeyboardControls();
  return <div></div>;
};

describe('useKeyboardControls', () => {
  let testObject: RenderResult;

  beforeEach(() => {
    testObject = render(<TestWrapper />);
  });

  it('ArrowUp calls onNextYear', () => {
    fireEvent.keyDown(testObject.container, { key: 'ArrowUp' });
    expect(mockOnNextYear).toHaveBeenCalledTimes(1);
  });

  it('ArrowRight calls onNextMonth', () => {
    fireEvent.keyDown(testObject.container, { key: 'ArrowRight' });
    expect(mockOnNextMonth).toHaveBeenCalledTimes(1);
  });

  it('ArrowLeft calls onPrevMonth', () => {
    fireEvent.keyDown(testObject.container, { key: 'ArrowLeft' });
    expect(mockOnPrevMonth).toHaveBeenCalledTimes(1);
  });

  it('ArrowDown calls onPrevYear', () => {
    fireEvent.keyDown(testObject.container, { key: 'ArrowDown' });
    expect(mockOnPrevYear).toHaveBeenCalledTimes(1);
  });
});
