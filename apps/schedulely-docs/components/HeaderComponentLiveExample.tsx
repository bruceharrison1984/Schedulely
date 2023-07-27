import { Sandpack } from '@codesandbox/sandpack-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'nextra-theme-docs';

export const HeaderComponentLiveExample = () => {
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
        '/HeaderExample.js': `import { HeaderComponent } from 'schedulely';
export const DefaultHeader: HeaderComponent = ({
  month,
  year,
  onNextMonth,
  onNextYear,
  onPrevMonth,
  onPrevYear,
  isCurrentMonth,
}) => {
  return (
    <div className="header-layout">
      <button
        className="header-button"
        title="Previous Month"
        onClick={onPrevMonth}
      >
        <strong>{'‹'}</strong>
      </button>
      <button
        className="header-button"
        title="Previous Year"
        onClick={onPrevYear}
      >
        <strong>{'«'}</strong>
      </button>

      <div role={'banner'} className="header-banner">
        <span role={'heading'} aria-level={1} className="header-text">
          {month} - {year}
        </span>
        {isCurrentMonth && (
          <div
            role={'alert'}
            className="current-month-indicator"
            title="Current Month"
          />
        )}
      </div>

      <button className="header-button" title="Next Year" onClick={onNextYear}>
        <strong>{'»'}</strong>
      </button>
      <button
        className="header-button"
        title="Next Month"
        onClick={onNextMonth}
      >
        <strong>{'›'}</strong>
      </button>
    </div>
  );
};
        `,
        '/App.js': `import 'schedulely/dist/index.css';
import { DefaultHeader } from './HeaderExample';

export default function App() {
    return (
      //wrapper div so example works correctly
      <div className="schedulely" style={{border: '1px dashed black'}}>
        <DefaultHeader 
          month={'January'}
          year={2008}
          isCurrentMonth={false}
          onNextMonth={()=>console.log('next month')} 
          onNextYear={()=>console.log('next year')}
          onPrevMonth={()=>console.log('prev month')}
          onPrevYear={()=>console.log('prev year')}
        />
    </div>
    )
}`,
      }}
    />
  );
};
