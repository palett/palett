import { ERROR, INFO, LOG, WARN } from '@spare/enum-loggers'
import { dateTime }               from '@valjoux/timestamp-pretty'
import { says }                   from '../index'

const warned = says[WARN].attach(dateTime).level(WARN).asc
const errored = says[ERROR].attach(dateTime).level(ERROR).asc.asc.asc
const logged = says[LOG].attach(dateTime).level(LOG)
const informed = says[INFO].attach(dateTime).level(INFO).asc

'warned' |> warned
'errored' |> errored
'logged' |> logged
'informed' |> informed
'informed again' |> informed