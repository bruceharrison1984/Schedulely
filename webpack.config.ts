import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import LicensePlugin from 'webpack-license-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import path from 'path';

const config: webpack.Configuration = {
  entry: [
    path.resolve(__dirname, 'src/index.ts'),
    path.resolve(__dirname, 'src/Schedulely.css'),
  ],
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles/Schedulely.css' }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? 'server' : 'disabled',
    }),
    new LicensePlugin(),
  ],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  resolve: {
    // alias: {
    //   'react-dom$': 'react-dom/profiling',
    //   'scheduler/tracing': 'scheduler/tracing-profiling',
    // },
    plugins: [
      new TsconfigPathsPlugin() as unknown as webpack.ResolvePluginInstance /* fix for unfinished typings */,
    ],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

export default config;
