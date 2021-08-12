import { samplesToTable }   from '@analys/convert'
import { Csv }              from '@spare/csv'
import { logger, says, Xr } from '@spare/logger'
import { time }             from '@valjoux/timestamp-pretty'
import del                  from 'del'
import gulp                 from 'gulp'
import rename               from 'gulp-rename'
import through              from 'through2'

const SRC = 'resources/source'
const DEST = 'resources/target'
says['processing'].attach(time)
const clean = () => del([DEST])

let index = 0
const CWD = process.cwd()

export const task = () => gulp
  .src(SRC + '/*/*.json')
  .pipe(through.obj((file, encoding, next) => {
    const colorList = file.contents|> JSON.parse
    const csv = colorList |> samplesToTable |> Csv.table
    file.contents = Buffer.from(csv)
    next(null, file)
    const FILENAME = file.history[0].replace(CWD, '') |> says['processing'].render
    Xr(String(index++)).file(FILENAME).records(colorList?.length) |> says['processing']
  }))
  .pipe(rename((path, file) => {
    return {
      dirname: path.dirname,
      basename: path.basename,
      extname: '.csv'
    }
  }))
  .pipe(gulp.dest(DEST))

export const convertJsonToCsv = gulp.series(
  clean,
  task
)



