import * as path from 'path'

const resolveImagePath = (rootDir: string, filePath: string, srcPath: string) =>
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