import path from 'path'

const CWD = process.cwd()

export const fileToInfo = file => {
  const [ filename ] = file.history
  const extname = path.extname(filename)
  const dirname = path.dirname(filename)
  return {
    dirname,
    relative: path.relative(CWD, dirname),
    basename: path.basename(filename, extname),
    extname
  }
}
