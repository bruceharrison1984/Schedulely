import { render } from '@testing-library/react';
import { useComponents } from '@/hooks';

describe('useComponents', () => {
  it('throws when called outside of provider', () => {
    const ExceptionWrapper = () => {
      expect(useComponents).toThrowError(/must be used within/);
      return <></>;
    };
    render(<ExceptionWrapper />);
  });
});
