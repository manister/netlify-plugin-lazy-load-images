const minify = require('@node-minify/core');
const babelMinify = require('@node-minify/babel-minify');
const fs = require('fs')

const buildClientJs = async () => {
  const script = await minify({
    compressor: babelMinify,
    input: 'client/src/lazyLoad.js',
    output: 'client/dist/lazyLoad.js',
    options: {
      presets: ['babel-preset-env']
    }
  });
  const jsonified = JSON.stringify({ script });
  fs.writeFileSync('client/lazyLoadClientScipt.json', jsonified, 'utf-8')
}

buildClientJs()
