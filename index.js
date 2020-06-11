const fs = require('fs');
const glob = require("glob")

const minify = require('@node-minify/core');
const babelMinify = require('@node-minify/babel-minify');

const handleSrcs = require('./lib/handleSrcs')
const handleSrcsets = require('./lib/handleSrcsets')

const scriptToInjectPromise = async () =>
  `<script type="text/javascript">${await minify({
    compressor: babelMinify,
    input: 'client/src/lazyLoad.js',
    output: 'client/lazyLoad.js',
    sync: true,
    options: {
      presets: ['babel-preset-env']
    }
  })}</script > `

module.exports = {
  onSuccess: async ({ inputs, constants, utils }) => {
    const { exclude, paletteSize } = inputs
    const imageConfig = { paletteSize, dir: constants.PUBLISH_DIR }
    const updateSrcs = handleSrcs(imageConfig)
    const updateSrcsets = handleSrcsets(imageConfig)
    const scriptToInject = await scriptToInjectPromise();
    try {
      const files = glob.sync(`${constants.PUBLISH_DIR}/**/*.html`, {
        ignore: exclude.map(exclusion => `${constants.PUBLISH_DIR} /${exclusion}`)
      })
      const updateFilesPromises = files.map(async file => {
        const fileData = fs.readFileSync(file)
        const fileDataString = fileData.toString()
        const srcsUpdated = await updateSrcs(fileDataString)
        const srcsetsUpdated = await updateSrcsets(srcsUpdated)
        const fileDataUpdated = srcsetsUpdated.replace('</body>', `${scriptToInject}</body>`)
        fs.writeFileSync(file, fileDataUpdated)
        return;
      })
      await Promise.all(updateFilesPromises)
    } catch (error) {
      utils.build.failPlugin('The Lazy Load plugin failed.', { error })
    }
  }
}