/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

global.React = React;

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});
