import { Sandpack } from '@codesandbox/sandpack-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'nextra-theme-docs';

export const SchedulelyLiveExample = () => {
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
        '/App.js': `import 'schedulely/dist/index.css';
import { Schedulely } from 'schedulely';

export default function App() {
    return <Schedulely events={[]} />
}`,
      }}
    />
  );
};
