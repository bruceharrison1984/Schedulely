import 'schedulely/dist/index.css';
import { Schedulely } from 'schedulely';
import { generateEvents } from '../../components/HomepageSchedulely/helpers.stories';
import React from 'react';

// Add react-live imports you need here
const ReactLiveScope = {
  React,
  ...React,
  Schedulely,
  generateEvents,
};
export default ReactLiveScope;
