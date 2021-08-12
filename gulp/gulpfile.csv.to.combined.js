import { Csv }        from '@spare/csv'
import { says, Xr }   from '@spare/logger'
import { time }       from '@valjoux/timestamp-pretty'
import gulp           from 'gulp'
import through        from 'through2'
import { NaiveCsv }   from 'naivecsv'
import del            from 'del'
import { fileToInfo } from './fileToInfo'
import { deco }       from '@spare/deco'
import { timeout }    from '@valjoux/timeout'
import { linger }     from '@valjoux/linger'
import merge          from 'merge-stream'

const SRC = 'resources/target'
const DEST = 'resources/output'
says['processing'].attach(time)
const color = says['processing'].render.bind(says['processing'])
const clean = () => del([DEST])

const tables = {}
let index = 0


export const task = async () => await gulp
  .src(SRC + '/custom-palettes/*.csv')
  .pipe(through.obj(async (file, encoding, next) =>
    await linger(0, () => {
      const table = file.contents|> NaiveCsv.toTable
      const csv = table |> Csv.table
      file.contents = Buffer.from(csv)
      const path = fileToInfo(file)
      tables[path.basename] = table
      Xr(String(index++)).file(deco([path.relative, path.basename])).records(table?.height) |> says['processing']
    }).then(() => {
      next(null, file)
    })))
  // .pipe(rename((path, file) => {
  //   return {
  //     dirname: path.dirname,
  //     basename: path.basename,
  //     extname: '.csv'
  //   }
  // }))
  .pipe(gulp.dest(DEST))

export const conglomerate = async () => {
  await timeout(0).then(() => {
    console.log('tables', tables)
  })
}

export const convertCsvToCombined = gulp.series(
  clean,
  task,
  conglomerate
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



