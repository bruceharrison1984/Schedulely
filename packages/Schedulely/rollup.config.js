import { defineConfig } from 'rollup';
import inject from '@rollup/plugin-inject';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import ts from 'rollup-plugin-ts';

const options = defineConfig({
  input: 'src/index.ts',
  output: {
    sourcemap: 'hidden',
    dir: './dist',
    format: 'esm',
    assetFileNames: '[name].css',
  },
  plugins: [
    progress(),
    peerDepsExternal(),
    postcss({ extract: 'index.css', sourceMap: true }),
    ts({
      transpiler: 'swc',
      swcConfig: {
        jsc: {
          minify: {
            compress: true,
            mangle: true,
          },
        },
        minify: true,
      },
    }),
    inject({
      React: 'react',
    }),
  ],
});

export default options;
