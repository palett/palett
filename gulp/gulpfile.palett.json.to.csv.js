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
const clean = function () { return del([ DEST ]) }

let index = 0
const CWD = new RegExp(process.cwd())
CWD |> logger
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

// export const bulkSavePremadeReports = async () => {
//   for (let key in IndicatorsCollection)
//     // if (key === 'Business')
//     await saveGroup({
//       topic: key,
//       indicator: IndicatorsCollection[key],
//       country: COUNTRIES,
//       year: YEARS
//     }).then(() => {
//       Xr().finish(key).countries(COUNTRIES |> deco).year(YEARS |> deco) |> logger
//     })
// }
//
// const saveGroup = async ({ topic, indicator, country, year }) => {
//   Xr().start(topic).countries(country |> deco).year(year |> deco) |> logger
//   try {
//     /** @type {Table} */
//     const table = await rawIndicators({ indicator, country, year, autoRefine: true, spin: true })
//     await Vinylize(topic + '.table.js')
//       .p(esvar(topic))
//       .p(Verse.table(table))
//       .asyncPipe(gulp.dest(DEST))
//     table |> DecoTable({ top: 3, bottom: 1 }) |> logger
//     scopeAndWriteFile.call({ dest: DEST, topic }, table, { side: 'year', banner: 'indicator', distinctBy: 'country' })
//     scopeAndWriteFile.call({ dest: DEST, topic }, table, { side: 'year', banner: 'country', distinctBy: 'indicator' })
//     scopeAndWriteFile.call({ dest: DEST, topic }, table, { side: 'country', banner: 'indicator', distinctBy: 'year' })
//   } catch (e) {
//     console.error(e)
//     Xr()[red('error')](topic).trace(e |> deco) |> logger
//   }
// }
//
// /**
//  *
//  * @param {Table} table
//  * @param {string} side
//  * @param {string} banner
//  * @param {string} distinctBy
//  */
// const scopeAndWriteFile = function (table, { side, banner, distinctBy }) {
//   const { dest, topic, header, footer } = this
//   const crostabCollection = seriesCrostab(table, { side, banner, sumBy: 'value', distinctBy, spin: true })
//   const title = topic + '.byEach' + capitalize(distinctBy)
//   const filename = title + '.md'
//   const stream = Vinylize(filename)
//     .p('## ' + title + LF + LF)
//     .p(( header ?? '' ) + LF + LF)
//   Xr('writing').file(filename) |> logger
//   for (let [ key, table ] of Object.entries(crostabCollection)) {
//     const meta = table.meta
//     // Xr('add file')[distinctBy](key).p(meta.filter |> deco) |> logger
//     stream
//       .p('### ' + key + LF + LF)
//       .p('##### Table-spec:' + table.title + LF + LF)
//       .p('##### Filter definition' + LF + Markdown.entries(Object.entries(meta.filter), { prefix: '- ' }) + LF + LF)
//       .p('##### Sides definition' + LF + Markdown.entries(Object.entries(meta.side), { prefix: '- ' }) + LF + LF)
//       .p('##### Banners definition' + LF + Markdown.entries(Object.entries(meta.banner), { prefix: '- ' }) + LF + LF)
//       .p(table |> Markdown.table)
//       .p(LF + '---' + LF + LF)
//   }
//   stream
//     .p(( footer ?? '' ) + LF + LF)
//     .pipe(gulp.dest(dest))
//   Xr('written').file(filename) |> logger
// }



