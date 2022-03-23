// rollup.config.js
import { babel } from '@rollup/plugin-babel';
import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import analyze from 'rollup-plugin-analyzer';
import styles from 'rollup-plugin-styles';
import typescript from '@rollup/plugin-typescript';

const options = defineConfig({
  input: 'src/index.ts',
  output: {
    sourcemap: 'hidden',
    dir: 'dist',
    format: 'esm',
    assetFileNames: '[name].css',
  },
  external: ['react/jsx-runtime', 'react'],
  plugins: [
    styles({ mode: ['extract'], minimize: true }),
    typescript({
      removeComments: true,
      exclude: [
        '**/__tests__',
        '**/*.spec.ts',
        '**/*.util.ts',
        '**/*.stories.tsx',
      ],
    }),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx'],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
    }),
    terser(),
    analyze({ summaryOnly: true, hideDeps: true, filter: 'hide-all' }),
  ],
});

export default options;
