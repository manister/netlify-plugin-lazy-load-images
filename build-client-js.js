const minify = require('@node-minify/core');
const babelMinify = require('@node-minify/babel-minify');

minify({
  compressor: babelMinify,
  input: 'client/src/lazyLoad.js',
  output: 'client/dist/lazyLoad.js',
  options: {
    presets: ['babel-preset-env']
  }
});