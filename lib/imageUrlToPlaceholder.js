
const getPlaceHolder = require('./getPlaceHolder')

const imageUrlToPlaceholder = async (imageUrl, paletteSize) => {
  try {
    const placeholder = await getPlaceHolder(imageUrl, { paletteSize });
    console.log("\x1b[32m", `Placeholder generated for: ${imageUrl}`)
    return placeholder
  } catch (e) {
    console.warn("\x1b[31m", `Couldn't get placeholder for ${imageUrl}, ${e}`)
    return null
  }
}

module.exports = imageUrlToPlaceholder