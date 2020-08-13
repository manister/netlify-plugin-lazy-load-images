import mergeArrayOfObjects from './mergeArrayOfObjects'
export type logObj = {[filename: string]: number}

const mergeLogObjArray : ((logs: logObj[]) => logObj)  = (logs) => mergeArrayOfObjects(logs)

export default mergeLogObjArray