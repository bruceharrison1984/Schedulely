import './DefaultEvent.scss';

import { DefaultEvent } from './DefaultEvent';
import { EventComponentProps } from '@/types';

export default {
  title: 'Components/Event',
};

export const Story = () => {
  const props: EventComponentProps = {
    event: {
      start: new Date(1, 1, 2022),
      end: new Date(1, 1, 2022),
      id: '12345',
      summary: 'Test event',
      color: 'red',
    },
    isHovered: false,
    onClick: () => null,
  };
  return (
    <div id="schedulely" className="schedulely" data-theme={'light'}>
      <DefaultEvent {...props} />
    </div>
  );
};
