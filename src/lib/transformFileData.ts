import { parse } from 'node-html-parser';
import * as fs from 'fs'


import filterImages from './filterImages'
import manipulateImage from './manipulateImage'

import { script } from '../../client/lazyLoadClientScript.json'

const scriptToInject = parse(`<script type="text/javascript">${script}</script>`, { script: true })

const parseHTML = (html) => parse(html, {
  script: true,
  style: true,
  pre: true,
  comment: true
})

const transformFileData = ({ excludeElements, dir, paletteSize, replaceThreshold }) => async (filePath) => {
  const fileData = fs.readFileSync(filePath)
  const fileDataString = fileData.toString();
  const document = parseHTML(fileDataString)
  const images = document.querySelectorAll('img, source')
  const filteredImages = filterImages(images, excludeElements)
  const updates = await Promise.all([...filteredImages].map(async image => await manipulateImage(image, { dir, filePath, paletteSize, replaceThreshold })));
  document.appendChild(scriptToInject)
  return {
    updatedFileData: document.toString(),
    updates: updates.flat()
  }
}

export default transformFileData