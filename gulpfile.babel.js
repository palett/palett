import gulp                 from 'gulp'
import { convertJsonToCsv } from './gulp/gulpfile.palett.json.to.csv'

export {
  convertJsonToCsv
}

export default gulp.series(
  convertJsonToCsv
)
