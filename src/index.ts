import * as fs from 'fs';
import * as glob from "glob"
import filesize from 'filesize'
import transformFileData from './lib/transformFileData'

type SuccessArgs = {
  inputs: {
    excludeFiles: Array<string>,
    excludeElements: string,
    paletteSize: number,
    replaceThreshold: number
  },
  constants: {
    PUBLISH_DIR: string
  },
  utils: any
}

export default {
  onSuccess: async ({ inputs, constants, utils }: SuccessArgs) => {
    const { excludeFiles, excludeElements, paletteSize, replaceThreshold } = inputs
    const transformFileDataWithCfg = transformFileData(
      {
        excludeElements,
        dir: constants.PUBLISH_DIR,
        paletteSize,
        replaceThreshold: replaceThreshold
      }
    )
    try {
      const files = glob.sync(`${constants.PUBLISH_DIR}/**/*.html`, {
        ignore: excludeFiles.map(exclusion => exclusion.indexOf('/') === 0 ? `${constants.PUBLISH_DIR}${exclusion}` : exclusion)
      })
      const results = await Promise.all(files.map(async file => {
        const { updatedFileData, updates } = await transformFileDataWithCfg(file)
        const oldSize = fs.statSync(file).size;
        fs.writeFileSync(file, updatedFileData)
        const newSize = fs.statSync(file).size;
        return { file, updates, difference: newSize - oldSize }
      }
      ))
      console.log('---')
      const grandTotal = results.reduce((grandAcca, { file, updates, difference }) => {
        const { total } = updates.reduce(({ total, obj }: { total: number, obj: { [url: string]: number } }, { url, fileSize }) => (
          {
            obj: { ...obj, [url]: fileSize },
            total: obj[url] ? total : total + fileSize
          }
        ), { total: 0, obj: {} })
        console.log('---')
        console.log(`Inline placeholders on ${file} have ${difference > 0 ? 'added' : 'reduced size by'} ${filesize(Math.abs(difference))}`)
        console.log(`Image requests on ${file} reduced by ${filesize(total)}`)
        console.log('---')
        return grandAcca + total;
      }, 0)
      console.log('---')
      console.log(`Total image requests reduced by ${filesize(grandTotal)}`)
    } catch (error) {
      utils.build.failPlugin('The Lazy Load plugin failed.', { error })
    }
  }
}
