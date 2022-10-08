import { defineConfig } from 'rollup';
import copy from 'rollup-plugin-copy';
import inject from '@rollup/plugin-inject';
import postcss from 'rollup-plugin-postcss';
import ts from 'rollup-plugin-ts';

const options = defineConfig({
  input: 'src/index.ts',
  output: {
    sourcemap: 'hidden',
    dir: 'dist',
    format: 'esm',
    assetFileNames: '[name].css',
  },
  external: ['react', 'react-dom'],
  plugins: [
    copy({
      targets: [{ src: '../../README.md', dest: './' }],
    }),
    postcss({ extract: 'index.css', sourceMap: true }),
    ts({
      cwd: '.',
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
