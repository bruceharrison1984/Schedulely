import { Sandpack } from '@codesandbox/sandpack-react';
import { useEffect, useState } from 'react';
import { useTheme } from 'nextra-theme-docs';

export const DarkModeLiveExample = () => {
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
import { useState } from 'react';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
    return (
      <div style={{backgroundColor: isDarkMode ? 'black' : 'white'}}>
        <span style={{color: isDarkMode ? 'white' : 'black'}}>Dark Mode:</span> <select onChange={(e) => {
          console.log(e.target.value)
          setIsDarkMode(e.target.value === "1" ? true : false)
        }}>
          <option value="0">false</option>
          <option value="1">true</option>
        </select>
        <Schedulely dark={isDarkMode} events={[]} />
      </div>
      )
}`,
      }}
    />
  );
};
