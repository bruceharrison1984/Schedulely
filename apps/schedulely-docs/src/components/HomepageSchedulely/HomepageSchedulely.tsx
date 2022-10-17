import 'schedulely/dist/index.css';

import { ResizableBox } from 'react-resizable';
import { Schedulely } from 'schedulely';
import { storyEvents } from './helpers.stories';
import { useColorMode } from '@docusaurus/theme-common';
import React from 'react';

const HomepageSchedulely = () => {
  const { colorMode } = useColorMode();

  return (
    <div
      className="homepage-schedulely"
      style={{ margin: 'auto', height: '100%' }}
    >
      <ResizableBox
        height={600}
        width={1200}
        style={{ maxWidth: '100%', maxHeight: '100%' }}
      >
        <Schedulely events={storyEvents} dark={colorMode === 'dark'} />
        <div className="homepage-action-message-end">
          Try live re-sizing by using this handle ^
        </div>
      </ResizableBox>
    </div>
  );
};

export default HomepageSchedulely;
