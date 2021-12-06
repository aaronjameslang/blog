import { parse } from 'csv-parse/sync' // npm i csv-parse
import {
  existsSync,
  readFileSync,
  statSync,
  writeFileSync
} from 'fs' // npm i @types/node
import { join } from 'path'
import { exit } from 'process'

const filenameSrc = join(__dirname, 'UK-HPI-full-file-2021-09.csv')
const filenameDst = join(__dirname, 'uk-data.json')

// Exit if no need to update
if (
  existsSync(filenameDst) &&
  statSync(filenameSrc).mtime <
  statSync(filenameDst).mtime
) exit()

const csv = readFileSync(filenameSrc)
const data = parse(csv, { columns: true })

type NumberPair = [number, number]
interface Row { Date: string, RegionName: string, AveragePrice: string }

const ukData = data
  .filter((row: Row) => row.RegionName === 'United Kingdom')
  .map((row: Row) => [
    new Date(row.Date.split('/').reverse().join('-')).getTime(),
    Number.parseFloat(row.AveragePrice)
  ])
  .sort((a: NumberPair, b: NumberPair) => a[0] - b[0])

writeFileSync(
  filenameDst,
  JSON.stringify(ukData, null, 2)
)
