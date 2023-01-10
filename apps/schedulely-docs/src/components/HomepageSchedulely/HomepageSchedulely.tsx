import 'schedulely/dist/index.css';

import { Resizable } from 're-resizable';
import { Schedulely } from 'schedulely';
import { storyEvents } from './helpers.stories';
import { useColorMode } from '@docusaurus/theme-common';
import React, { useState } from 'react';

const HomepageSchedulely = () => {
  const { colorMode } = useColorMode();
  const [theme, setTheme] = useState<string>('default');

  return (
    <>
      <div style={{ marginTop: '0.5em', textAlign: 'center' }}>
        <label htmlFor="theme-selector">Theme: </label>
        <select id="theme-selector" onChange={(e) => setTheme(e.target.value)}>
          <option>default</option>
          <option>minimal</option>
        </select>
      </div>
      <div
        className="homepage-schedulely"
        style={{
          margin: 'auto',
          height: '100%',
          paddingTop: '1em',
        }}
      >
        <Resizable
          defaultSize={{
            width: '100%',
            height: '100%',
          }}
          maxHeight={'100%'}
          maxWidth={'100%'}
          minHeight={'71%'}
          minWidth={'40%'}
          handleStyles={{
            bottom: {
              border: '1px',
              borderStyle: 'none none dashed none',
            },
            left: {
              border: '1px',
              borderStyle: 'none none none dashed',
            },
            top: {
              border: '1px',
              borderStyle: 'dashed none none none',
            },
            right: {
              border: '1px',
              borderStyle: 'none dashed none none',
            },
          }}
        >
          <Schedulely
            events={storyEvents}
            dark={colorMode === 'dark'}
            theme={theme}
            initialDayOfWeekFormat={'small'}
          />
          <div className="resize-action-message">
            Test{' '}
            <a href="https://github.com/bokuweb/re-resizable" target={'_blank'}>
              live resize
            </a>{' '}
            by dragging the dashed line
          </div>
        </Resizable>
      </div>
    </>
  );
};

export default HomepageSchedulely;
