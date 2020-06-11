const getPlaceHolder = require('./getPlaceHolder');
const replaceAsync = require('./replaceAsync')

const handleSrcs = ({ dir, paletteSize }) => async (fileDataString) => await replaceAsync(
  fileDataString,
  /<img[^>]*(src=(?:"|)([^"\s]*)(?:"|\s))[^>]*>/gm,
  async (str, attr, src) => {
    const absoluteSrc = src.indexOf('http') === 0 ? src : `${dir}/${src}`
    const updatedSrc = await getPlaceHolder(absoluteSrc, { paletteSize });
    const updatedAttr = attr.replace(src, updatedSrc);
    const dataLazySrc = `data-lazy-src="${src}"`
    const updatedString = str.replace(attr, `${updatedAttr} ${dataLazySrc}`)
    return updatedString;
  }
)

module.exports = handleSrcs;