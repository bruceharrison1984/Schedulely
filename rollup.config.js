// rollup.config.js
import { defineConfig } from 'rollup';
import { terser } from 'rollup-plugin-terser';
import styles from 'rollup-plugin-styles';
import ts from 'rollup-plugin-ts';

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
    ts({
      transpiler: 'babel',
    }),
    terser(),
  ],
});

export default options;
