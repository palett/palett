import { decode } from 'querystring'
import url        from 'url'

const text = 'https%3A%2F%2Fmmsmedia.vht.com%2FMedia%2FPhotography%2FDEGI%2F1052772%2F93c88dbc-edf1-441a-a3cb-488d07ff26c2.jpg'
console.log(url.parse(text))
console.log(decode(text))