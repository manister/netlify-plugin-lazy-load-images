import parse from 'node-html-parser'

const filterImages = (images, selectorList) => {
  //node-html-parser query selector doesn't understand comma seperated selectors
  const selectorArray = selectorList.split(',').map(str => str.trim())
  return images.filter(image => {
    const document = parse('') //empty document
    document.appendChild(image)
    return selectorArray.every(selector => !document.querySelector(selector))
  })
}

export default filterImages

