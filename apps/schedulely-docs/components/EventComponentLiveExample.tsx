import { Sandpack } from '@codesandbox/sandpack-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'nextra-theme-docs';

export const EventComponentLiveExample = () => {
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
        '/EventExample.js': `import { EventComponent } from 'schedulely';
export const DefaultEvent: EventComponent = ({ event, isHovered, onClick }) => {
  const classes = ['event'];
  if (isHovered) classes.push('event-selected');

  return (
    <div
      role={'listitem'}
      data-eventid={event.id}
      className={classes.join(' ')}
      style={{
        backgroundColor: event.color,
      }}
      title={event.summary}
      onClick={() => onClick(event)}
    >
      <div className="event-text-container">{event.summary}</div>
    </div>
  );
};
        `,
        '/App.js': `import 'schedulely/dist/index.css';
import { DefaultEvent } from './EventExample';

export default function App() {
    return (
      //wrapper div so example works correctly
      <div className="schedulely">
        <DefaultEvent 
          event={{
            id: 1,
            color: 'lightblue',
            summary: 'example event'
          }}
          isHovered={false}
          onClick={()=>console.log('event clicked!')}
        />
    </div>
    )
}`,
      }}
    />
  );
};
