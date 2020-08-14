import * as glob from 'glob'
import filesize from 'filesize'
import sum from './lib/sum'
import transformFileData from './lib/transformFileData'
import mergeLogObjArray from './lib/mergeLogObjArray'


type SuccessArgs = {
  inputs: {
    excludeFiles: Array<string>,
    excludeElements: string,
    applyContainer: string,
    replaceThreshold: number
  },
  constants: {
    PUBLISH_DIR: string
  },
  utils: any
}

export default {
  onSuccess: async ({ inputs, constants, utils }: SuccessArgs) => {
    const { excludeFiles, excludeElements, applyContainer, replaceThreshold } = inputs
    try {
      const files: string[] = glob.sync(`${constants.PUBLISH_DIR}/**/*.html`, {
        ignore: excludeFiles.map(exclusion => exclusion.indexOf('/') === 0 ? `${constants.PUBLISH_DIR}${exclusion}` : exclusion)
      })
      const logs = await Promise.all(files.map(async (filePath: string) => {
        const log = await transformFileData({
          filePath,
          excludeElements,
          dir: constants.PUBLISH_DIR,
          applyContainer,
          replaceThreshold
        })
        const totalForFileLogged = filesize(sum(Object.values(log)));
        console.log("\x1b[32m", `For ${filePath}, ${totalForFileLogged} in unique requests saved.`, "\x1b[0m")
        return log;
       }
      ))
      const totalLogged = filesize(sum(Object.values(mergeLogObjArray(logs))));
      console.log("\x1b[32m", `In total ${totalLogged} in unique requests saved.`, "\x1b[0m")

    } catch (error) {
      utils.build.failPlugin('The Lazy Load plugin failed.', { error })
    }
  }
}
