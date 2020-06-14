const { parse } = require('node-html-parser');
const fs = require('fs');

const filterImages = require('./filterImages')
const manipulateImage = require('./manipulateImage')

const { script } = require('../client/lazyLoadClientScript.json')

const scriptToInject = parse(`<script type="text/javascript">${script}</script>`, { script: true })

const parseHTML = (html) => parse(html, {
  script: true,
  style: true,
  pre: true,
  comment: true
})

const transformFileData = ({ excludeElements, dir, paletteSize }) => async (filePath) => {
  const fileData = fs.readFileSync(filePath)
  const fileDataString = fileData.toString();
  const document = parseHTML(fileDataString)
  const images = document.querySelectorAll('img, source')
  const filteredImages = filterImages(images, excludeElements)
  await Promise.all([...filteredImages].map(async image => await manipulateImage(image, { dir, filePath, paletteSize })));
  document.appendChild(scriptToInject)
  return document.toString();
}

module.exports = transformFileData