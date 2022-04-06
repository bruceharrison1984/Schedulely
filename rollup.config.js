import { defineConfig } from 'rollup';
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
  external: ['react/jsx-runtime', 'react', /@swc\/helpers/, /date-fns/],
  plugins: [
    postcss({ extract: 'index.css', minimize: true }),
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
  ],
});

export default options;
