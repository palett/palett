import { ERROR, INFO, LOG, WARN } from '@spare/enum-loggers'
import { dateTime }               from '@valjoux/timestamp-pretty'
import { says }                   from '../index'

const warned = says[WARN].setLogger(WARN).asc
const errored = says[ERROR].setLogger(ERROR).asc.asc.asc
const logged = says[LOG].setLogger(LOG)
const informed = says[INFO].setLogger(INFO).asc

dateTime() + ' warned' |> warned
dateTime() + ' errored' |> errored
dateTime() + ' logged' |> logged
dateTime() + ' informed' |> informed