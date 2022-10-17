import 'schedulely/dist/index.css';

import { Resizable } from 're-resizable';
import { Schedulely } from 'schedulely';
import { storyEvents } from './helpers.stories';
import { useColorMode } from '@docusaurus/theme-common';
import React from 'react';

const HomepageSchedulely = () => {
  const { colorMode } = useColorMode();

  return (
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
        minHeight={'70%'}
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
        <Schedulely events={storyEvents} dark={colorMode === 'dark'} />
        <div className="resize-action-message">
          Test{' '}
          <a href="https://github.com/bokuweb/re-resizable" target={'_blank'}>
            live resize
          </a>{' '}
          by dragging the dashed line
        </div>
      </Resizable>
    </div>
  );
};

export default HomepageSchedulely;
