import gulp                     from 'gulp'
import { convertJsonToCsv }     from './gulp/gulpfile.palett.json.to.csv'
import { convertCsvToCombined } from './gulp/gulpfile.csv.to.combined'

export {
  convertJsonToCsv,
  convertCsvToCombined
}

export default gulp.series(
  convertJsonToCsv,
  convertCsvToCombined
)
