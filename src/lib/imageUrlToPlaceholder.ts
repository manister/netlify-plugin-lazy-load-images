import getPlaceHolder from './getPlaceHolder'

const imageUrlToPlaceholder = async (imageUrl: string, paletteSize: number) => {
  try {
    const placeholder = await getPlaceHolder(imageUrl, { paletteSize });
    return placeholder
  } catch (e) {
    console.warn("\x1b[31m", `Couldn't get placeholder for ${imageUrl}, ${e}`, "\x1b[32m",)
    return ''
  }
}
export default imageUrlToPlaceholder