import * as path from 'path'

const resolveImagePath = (rootDir, filePath, srcPath) =>
  path.join(
    rootDir,
    path.resolve(
      path.join(
        '/',
        path.dirname(
          path.relative(
            rootDir,
            filePath))
      ),
      srcPath
    )
  )

export default resolveImagePath