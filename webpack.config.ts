import * as webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

const config: webpack.Configuration = {
  entry: [
    path.resolve(__dirname, 'src/index.ts'),
    path.resolve(__dirname, 'src/Calendo.scss'),
  ],
  mode: process.env.NODE_ENV !== 'production' ? 'development' : 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({ filename: 'styles/Calendo.css' }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.ANALYZE ? 'server' : 'disabled',
    }),
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
        test: /\.scss$/i,
        use: [
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};

export default config;
