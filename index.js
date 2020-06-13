const fs = require('fs');
const glob = require("glob")

const { script } = require('./client/lazyLoadClientScript.json')
const { parse } = require('node-html-parser');
const manipulateImage = require('./lib/manipulateImage')

const scriptToInject = `<script type="text/javascript">${script}</script>`

module.exports = {
  onSuccess: async ({ inputs, constants, utils }) => {
    const { exclude, paletteSize } = inputs
    try {
      const files = glob.sync(`${constants.PUBLISH_DIR}/**/*.html`, {
        ignore: exclude.map(exclusion => exclusion.indexOf('/') === 0 ? `${constants.PUBLISH_DIR}${exclusion}` : exclusion)
      })
      const updateFilesPromises = files.map(async file => {
        const cfg = { filePath: file, dir: constants.PUBLISH_DIR, paletteSize }
        const fileData = fs.readFileSync(file)
        const fileDataString = fileData.toString()
        const document = parse(fileDataString)
        const images = document.querySelectorAll('img, source')
        await Promise.all([...images].map(async image => await manipulateImage(image, cfg)));
        const lazyImagesAdded = document.toString();
        const scriptInjected = lazyImagesAdded.includes('</body>') ? lazyImagesAdded.replace('</body>', `${scriptToInject}</body>`) : `${lazyImagesAdded}${scriptToInject}`
        fs.writeFileSync(file, scriptInjected)
        return;
      })
      await Promise.all(updateFilesPromises)
    } catch (error) {
      utils.build.failPlugin('The Lazy Load plugin failed.', { error })
    }
  }
}