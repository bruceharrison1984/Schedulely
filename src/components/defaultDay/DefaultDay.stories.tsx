import './DefaultDay.scss';

import { DayComponentProps } from '@/types';
import { DefaultDay } from './DefaultDay';

export default {
  title: 'Components/DefaultDay',
};

export const Story = () => {
  const props: DayComponentProps = {
    isCurrentMonth: true,
    isToday: true,
    dateNumber: 22,
    events: [],
    isOverflowed: true,
    onClick: () => null,
  };
  return (
    <div style={{ height: '5em' }}>
      <div id="schedulely" className="schedulely" data-theme={'light'}>
        <DefaultDay {...props} />
      </div>
    </div>
  );
};
