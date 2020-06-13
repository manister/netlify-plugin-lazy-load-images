const minify = require('@node-minify/core');
const babelMinify = require('@node-minify/babel-minify');
const fs = require('fs')

const buildClientJs = async () => {
  const script = await minify({
    compressor: babelMinify,
    input: 'client/src/lazyLoad.js',
    output: 'client/lazyLoad.js',
    options: {
      presets: ['babel-preset-env']
    }
  });
  const jsonified = JSON.stringify({ script });
  try {
    fs.unlinkSync('client/lazyLoad.js')
  } catch (err) {
    console.error(err)
  }
  fs.writeFileSync('client/lazyLoadClientScipt.json', jsonified, 'utf-8')
}

buildClientJs()
