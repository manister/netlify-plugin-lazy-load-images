import getPlaceHolder from './getPlaceHolder'

const imageUrlToPlaceholder = async (imageUrl: string) => {
  try {
    const placeholder = await getPlaceHolder(imageUrl);
    console.log("\x1b[32m", `Placeholder generated for ${imageUrl}`, "\x1b[32m",)
    return placeholder
  } catch (e) {
    console.warn("\x1b[31m", `Couldn't get placeholder for ${imageUrl}, ${e}`, "\x1b[32m",)
    return ''
  }
}
export default imageUrlToPlaceholder