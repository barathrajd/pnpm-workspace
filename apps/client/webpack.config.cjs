/**
 * @typedef {import('webpack').Configuration} WebpackConfiguration
 */

const path = require('path');
const baseConfig = require('../../webpack.config.cjs');
console.log(process.env.NODE_ENV);
module.exports = {
  ...baseConfig,
  output: {
    ...baseConfig.output,
    path: path.resolve(__dirname, '../../build/apps/client'),
  },
};
