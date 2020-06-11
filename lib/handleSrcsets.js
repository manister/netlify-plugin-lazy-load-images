const getPlaceHolder = require('./getPlaceHolder');
const replaceAsync = require('./replaceAsync')
const srcset = require('srcset');

const handleSrcsets = ({ dir, paletteSize }) => async (fileDataString) => await replaceAsync(
  fileDataString,
  /(?:img|source)[^>]*(srcset="([^"]*)")[^>]*>/gm,
  async (str, attr, srcsetValue) => {
    const srcsetParsed = srcset.parse(srcsetValue);
    const updatedSrcset = await Promise.all(
      srcsetParsed.map(async ({ url, density }) => {
        const absoluteUrl = srcsetValue.indexOf('http') === 0 ? url : `${dir}/${url}`
        return { url: await getPlaceHolder(absoluteUrl, { paletteSize }), density }
      })
    )
    const updatedAttr = attr.replace(srcsetValue, srcset.stringify(updatedSrcset));
    const dataLazySrcset = `data-lazy-srcset="${srcsetValue}"`
    const updatedString = str.replace(attr, `${updatedAttr} ${dataLazySrcset}`)
    return updatedString;
  }
)

module.exports = handleSrcsets;