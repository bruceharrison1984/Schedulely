import 'schedulely/dist/index.css';

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
      <Schedulely events={storyEvents} dark={colorMode === 'dark'} />
    </div>
  );
};

export default HomepageSchedulely;
