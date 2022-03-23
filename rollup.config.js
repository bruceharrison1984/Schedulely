// rollup.config.js
import { defineConfig } from 'rollup';
import css from 'rollup-plugin-import-css';
import typescript from '@rollup/plugin-typescript';

const options = defineConfig({
  input: ['src/Schedulely.tsx', 'src/Schedulely.css'],
  output: {
    sourcemapFile: 'Schedulely.map.js',
    dir: 'dist',
    format: 'esm',
  },
  plugins: [typescript(), css({ include: ['./src/Schedulely.css'] })],
});

export default options;
