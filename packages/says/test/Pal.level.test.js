import { ERROR, INFO, LOG, WARN } from '@spare/enum-loggers'
import { dateTime }               from '@valjoux/timestamp-pretty'
import { says }                   from '../index'

const warned = says[WARN].level(WARN).asc
const errored = says[ERROR].level(ERROR).asc.asc.asc
const logged = says[LOG].level(LOG)
const informed = says[INFO].level(INFO).asc

dateTime() + ' warned' |> warned
dateTime() + ' errored' |> errored
dateTime() + ' logged' |> logged
dateTime() + ' informed' |> informed