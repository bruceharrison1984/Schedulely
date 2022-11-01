import { render } from '@testing-library/react';
import { useBreakpoint } from '@/hooks';

describe('useBreakpoint', () => {
  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useBreakpoint).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
