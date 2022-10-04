import '../src/components/defaultEvent/DefaultEvent.scss';

import { DefaultEvent } from '@/components';
import { EventComponentProps } from '@/types';

const story = {
  title: 'Components/Event',
};
export default story;

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
