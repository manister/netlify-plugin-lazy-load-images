const srcset = require('srcset');

const getPlaceHolder = require('./getPlaceHolder');
const replaceAsync = require('./replaceAsync')
const resolveImagePath = require('./resolveImagePath')

const handleSrcsets = ({ paletteSize }) => async (fileDataString, filePath) => await replaceAsync(
  fileDataString,
  /(?:img|source)[^>]*(srcset="([^"]*)")[^>]*>/gm,
  async (str, attr, srcsetValue) => {
    const srcsetParsed = srcset.parse(srcsetValue);
    const updatedSrcset = await Promise.all(
      srcsetParsed.map(async ({ url, density }) => {
        const absoluteUrl = url.indexOf('http') === 0 ? url : resolveImagePath(dir, filePath, url)
        console.log("\x1b[32m", `Image found at: ${absoluteUrl}`)
        try {
          return { url: await getPlaceHolder(absoluteUrl, { paletteSize }), density }
        } catch (e) {
          console.warn("\x1b[31m", `Couldn't get placeholder for ${absoluteUrl}, ${e}`)
          return { url, density }
        }
      })
    )
    const updatedAttr = attr.replace(srcsetValue, srcset.stringify(updatedSrcset));
    const dataLazySrcset = `data-lazy-srcset="${srcsetValue}"`
    const updatedString = str.replace(attr, `${updatedAttr} ${dataLazySrcset}`)
    return updatedString;
  }
)

module.exports = handleSrcsets;