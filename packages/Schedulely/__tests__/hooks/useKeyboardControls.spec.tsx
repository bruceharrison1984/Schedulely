import { ActionProvider } from '../../src/providers';
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

const mockOnUpArrow = vi.fn();
const mockOnDownArrow = vi.fn();
const mockOnLeftArrow = vi.fn();
const mockOnRightArrow = vi.fn();

const Wrapper = () => {
  useKeyboardControls();
  return <div></div>;
};

const TestWrapper = () => {
  return (
    <ActionProvider>
      <Wrapper />
    </ActionProvider>
  );
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

  describe('custom keyboard events', () => {
    beforeEach(() => {
      vi.mock('@/hooks/useActions', () => ({
        useActions: vi.fn(() => ({
          keyboardEvents: {
            onUpArrow: mockOnUpArrow,
            onDownArrow: mockOnDownArrow,
            onLeftArrow: mockOnLeftArrow,
            onRightArrow: mockOnRightArrow,
          },
        })),
      }));
    });

    it('ArrowUp calls onUpArrow', () => {
      fireEvent.keyDown(testObject.container, { key: 'ArrowUp' });
      expect(mockOnUpArrow).toHaveBeenCalledTimes(1);
    });

    it('ArrowRight calls onRightArrow', () => {
      fireEvent.keyDown(testObject.container, { key: 'ArrowRight' });
      expect(mockOnRightArrow).toHaveBeenCalledTimes(1);
    });

    it('ArrowLeft calls onLeftArrow', () => {
      fireEvent.keyDown(testObject.container, { key: 'ArrowLeft' });
      expect(mockOnLeftArrow).toHaveBeenCalledTimes(1);
    });

    it('ArrowDown calls onDownArrow', () => {
      fireEvent.keyDown(testObject.container, { key: 'ArrowDown' });
      expect(mockOnDownArrow).toHaveBeenCalledTimes(1);
    });
  });
});
