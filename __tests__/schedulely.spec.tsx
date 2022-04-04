import { Schedulely } from '@/Schedulely';
import { render } from '@testing-library/react';

describe('schedulely', () => {
  render(<Schedulely events={[]} />);

  it('passes', () => expect('').toBe(''));
});
