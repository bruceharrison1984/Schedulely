import { render } from '@testing-library/react';
import { useEventIntersection } from '@/hooks';

/** There isn't a great way to test this due to it relying so heavily on actual rendered container sizes. */

describe('useEventIntersection', () => {
  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useEventIntersection).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
