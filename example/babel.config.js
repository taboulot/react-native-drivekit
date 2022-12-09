const path = require('path');
const packCore = require('../packages/core/package.json');
const packTripAnalysis = require('../packages/trip-analysis/package.json');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
           [packCore.name]: path.join(__dirname, '../packages/core', packCore.source),
        },
      },
    ],
  ],
};
