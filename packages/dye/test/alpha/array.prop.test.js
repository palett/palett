import { logger } from '@spare/logger'

const arr = [1, 2, 3]
arr.dev = 5

arr |> console.log
arr.dev |> logger

arr.map(x => x * 2) |> console.log

Array.isArray(arr) |> logger

const ob = {}
ob.length = 5
Array.isArray(ob) |> logger
