import { parse } from 'node-html-parser'
import * as fs from 'fs'

import filterImages from './filterImages'
import manipulateImage from './manipulateImage'

import initialiseLazyLoad from './client/initialiseLazyLoad'

import mergeLogObjArray from './mergeLogObjArray'

const scriptToInject = parse(`<script type="text/javascript">document.addEventListener('DOMContentLoaded', ${initialiseLazyLoad.toString()})</script>`, { script: true })

const parseHTML = (html: string) => parse(html, {
  script: true,
  style: true,
  pre: true,
  comment: true
})

type TransformFileDataCfg = {
  filePath: string,
  excludeElements: string,
  applyContainer: string,
  dir: string,
  replaceThreshold: number,
}


const transformFileData = async ({ filePath, excludeElements, dir, replaceThreshold, applyContainer }: TransformFileDataCfg) => {
  const fileData = fs.readFileSync(filePath)
  const fileDataString = fileData.toString();
  const parsed = parseHTML(fileDataString)
  const document = (parsed as unknown as HTMLElement)
  const images = document.querySelectorAll<HTMLImageElement | HTMLSourceElement>(`${applyContainer} img, ${applyContainer} source`)
  const filteredImages = filterImages(Array.from(images), excludeElements)
  const logs = await Promise.all([...filteredImages].map(async image => await manipulateImage(image, { dir, filePath, replaceThreshold })));
  document.appendChild(scriptToInject as unknown as HTMLElement)
  const updatedFileData = document.toString()
  fs.writeFileSync(filePath, updatedFileData)
  return mergeLogObjArray(logs)
}

export default transformFileData