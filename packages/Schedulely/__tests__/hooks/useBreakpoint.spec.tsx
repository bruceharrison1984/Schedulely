import { render } from '@testing-library/react';
import { useBreakpoint } from '@/hooks';

/** There isn't a great way to test this due to it relying so heavily on actual rendered container sizes. */

describe('useBreakpoint', () => {
  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useBreakpoint).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
