const getPlaceHolder = require('./getPlaceHolder');
const replaceAsync = require('./replaceAsync')
const resolveImagePath = require('./resolveImagePath')

const handleSrcs = ({ dir, paletteSize }) => async (fileDataString, filePath) => await replaceAsync(
  fileDataString,
  /<img[^>]*(src=(?:"|)([^"\s]*)(?:"|\s))[^>]*>/gm,
  async (str, attr, src) => {
    const absoluteSrc = src.indexOf('http') === 0 ? src : resolveImagePath(dir, filePath, src)
    console.log("\x1b[32m", `Image found at: ${absoluteSrc}`)
    let updatedString = str;
    try {
      const updatedSrc = await getPlaceHolder(absoluteSrc, { paletteSize });
      const updatedAttr = attr.replace(src, updatedSrc);
      const dataLazySrc = `data-lazy-src="${src}"`
      updatedString = str.replace(attr, `${updatedAttr} ${dataLazySrc}`)
    } catch (e) {
      console.warn("\x1b[31m", `Couldn't get placeholder for ${absoluteSrc}, ${e}`)
    }
    return updatedString;
  }
)

module.exports = handleSrcs;