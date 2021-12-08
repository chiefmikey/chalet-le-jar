import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);

const SRC_DIR = path.join(path.resolve(), '/docs/client/src');
const DIST_DIR = path.join(path.resolve(), '/docs/client/public/dist');

const css = ['style-loader', 'css-loader'];
const scss = ['style-loader', 'css-loader', 'sass-loader'];

export default {
  entry: `${SRC_DIR}/index.ts`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      node: 'current',
                    },
                  },
                ],
                '@babel/preset-react',
                ['@babel/preset-typescript', { jsxPragma: 'h' }],
              ],
              plugins: [
                [
                  '@babel/plugin-transform-react-jsx',
                  {
                    pragma: 'h',
                    pragmaFrag: 'Fragment',
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: css,
      },
      {
        test: /\.s[ac]ss$/,
        use: scss,
      },
      {
        test: /\.(png|ttf|jp(e*)g|svg)$/,
        use: 'url-loader?limit=100000&name=img/[name].[ext]',
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.vue', '.json', '...'],
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
    fallback: {
      fs: false,
      url: require.resolve('url'),
      http: require.resolve('stream-http'),
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
      stream: require.resolve('stream-browserify'),
      os: require.resolve('os-browserify/browser'),
    },
  },
  experiments: {
    topLevelAwait: true,
  },
};
