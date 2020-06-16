import { parse } from 'node-html-parser'
import * as fs from 'fs'

import filterImages from './filterImages'
import manipulateImage from './manipulateImage'

import initialiseLazyLoad from './client/initialiseLazyLoad'

const scriptToInject = parse(`<script type="text/javascript">document.addEventListener('DOMContentLoaded', ${initialiseLazyLoad.toString()})</script>`, { script: true })

const parseHTML = (html: string) => parse(html, {
  script: true,
  style: true,
  pre: true,
  comment: true
})

type TransformFileDataCfg = {
  excludeElements: string,
  dir: string,
  paletteSize: number,
  replaceThreshold: number
}

const transformFileData = ({ excludeElements, dir, paletteSize, replaceThreshold }: TransformFileDataCfg) => async (filePath: string) => {
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