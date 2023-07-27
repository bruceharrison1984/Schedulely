import { Sandpack } from '@codesandbox/sandpack-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'nextra-theme-docs';

export const DayComponentLiveExample = () => {
  const { theme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(theme === 'dark');

  useEffect(() => {
    if (localStorage.getItem('theme'))
      setIsDarkMode(localStorage.getItem('theme') === 'dark');
  }, [theme]);

  return (
    <Sandpack
      template="react"
      theme={isDarkMode ? 'dark' : 'light'}
      customSetup={{
        dependencies: {
          schedulely: 'latest',
        },
      }}
      options={{
        editorHeight: '36em',
        showLineNumbers: true,
      }}
      files={{
        '/DayExample.js': `import { DayComponent } from 'schedulely';
export const DefaultDay: DayComponent = ({
  isCurrentMonth,
  isToday,
  events,
  isOverflowed,
  onMoreEventsClick,
  onDayClick,
  date,
}) => {
  const dayHeader = isToday ? (
    <div className="default-day-header--indicator">
      <span className="default-day-header--text">{date.getDate()}</span>
    </div>
  ) : (
    <span className="default-day-header--text">{date.getDate()}</span>
  );

  const hiddenEventTooltip =
    events.length > 1 ? \`(\${events.length}) hidden events\` : '(1) hidden event';

  return (
    <div
      role={'cell'}
      className={\`default-day \${
        isCurrentMonth ? 'default-day-current' : 'default-day-sibling'
      }\`}
      onClick={() => onDayClick(date)}
    >
      <div role={'heading'} aria-level={2} className="default-day-header">
        {dayHeader}
      </div>
      {isOverflowed && (
        <div
          role={'note'}
          className="additional-events-indicator"
          title={hiddenEventTooltip}
          onClick={() => onMoreEventsClick(events)}
        >
          ...
        </div>
      )}
    </div>
  );
};
        `,
        '/App.js': `import 'schedulely/dist/index.css';
import { DefaultDay } from './DayExample';

export default function App() {
    return (
      //wrapper div so example works correctly
      <div className="schedulely" style={{width: '5em', height: '5em', border: '1px dashed black'}}>
        <DefaultDay 
          isCurrentMonth={false} 
          isToday={false} 
          date={new Date()} 
          isOverflowed={true}
          onMoreEventsClick={()=>console.log('clicked event!')}
          onDayClick={()=>console.log('clicked day!')}
          events={[]}
        />
    </div>
    )
}`,
      }}
    />
  );
};
