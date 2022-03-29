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
  external: ['react/jsx-runtime', 'react', /@babel\/runtime/],
  plugins: [
    styles({ mode: ['extract'], minimize: true }),
    ts({
      transpiler: 'babel',
      babelConfig: {
        plugins: [['@babel/plugin-transform-runtime', { corejs: 3 }]],
      },
    }),
    terser(),
  ],
});

export default options;
