const fs = require('fs');
const glob = require("glob")
const transformFileData = require('./lib/transformFileData')

module.exports = {
  onSuccess: async ({ inputs, constants, utils }) => {
    const { excludeFiles, excludeElements, paletteSize, } = inputs
    const transformFileDataWithCfg = transformFileData(
      {
        excludeElements,
        dir: constants.PUBLISH_DIR,
        paletteSize
      }
    )
    try {
      const files = glob.sync(`${constants.PUBLISH_DIR}/**/*.html`, {
        ignore: excludeFiles.map(exclusion => exclusion.indexOf('/') === 0 ? `${constants.PUBLISH_DIR}${exclusion}` : exclusion)
      })
      await Promise.all(files.map(async file => fs.writeFileSync(file, await transformFileDataWithCfg(file))
      ))
    } catch (error) {
      utils.build.failPlugin('The Lazy Load plugin failed.', { error })
    }
  }
}