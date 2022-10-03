import { defineConfig } from 'rollup';
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
