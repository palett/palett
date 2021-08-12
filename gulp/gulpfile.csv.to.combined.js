import { subFileInfos, subFolders } from '@acq/path'
import { Table }                    from '@analys/table'
import { Vinylize }                 from '@flua/vinylize'
import { Csv }                      from '@spare/csv'
import { SP }                       from '@spare/enum-chars'
import { logger, says, Xr }         from '@spare/logger'
import { time }                     from '@valjoux/timestamp-pretty'
import { acquire, iso }             from '@vect/vector'
import del                          from 'del'
import { promises }                 from 'fs'
import gulp                         from 'gulp'
import { NaiveCsv }                 from 'naivecsv'

const SRC = 'resources/target'
const DEST = 'resources/output'
says['processing'].attach(time)
const color = says['processing'].render.bind(says['processing'])
const clean = () => del([ DEST ])

const SUBFOLDERS = []
const tables = {}
let index = 0

export const readSubFolders = async () => {
  const dirs = await subFolders(SRC)
  SUBFOLDERS.push(...dirs)
  console.log(SUBFOLDERS)
}


export const task = async () => {
  console.log(SUBFOLDERS)
  const TABLE_COLLECTION = {}
  for (const subFolder of SUBFOLDERS) {
    await collectUnderFolder(subFolder)
  }
}

export const collectUnderFolder = async (subFolder) => {
  const files = await subFileInfos(SRC + '/' + subFolder)
  const TABLE = new Table()
  Xr(SP + time()).folder(subFolder).records(TABLE.height)|> logger
  for (let file of files) {
    const buffer = await promises.readFile(file.dir + '/' + file.base + file.ext)
    const table = buffer |> NaiveCsv.toTable |> Table.from
    table
      .unshiftColumn('card', iso(table.height, file.base))
      .pushColumn('domain', iso(table.height, subFolder))
    if (table.head?.length > TABLE.head?.length) TABLE.head = table.head
    acquire(TABLE.rows, table.rows)
    Xr(SP + SP + time()).source(file.base).append(table.height).records(TABLE.height)|> logger
  }
  Vinylize(subFolder + '.csv')
    .p(TABLE |> Csv.table)
    .pipe(gulp.dest(DEST + '/' + subFolder))
}


export const convertCsvToCombined = gulp.series(
  clean,
  readSubFolders,
  task
)


