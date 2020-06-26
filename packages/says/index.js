import { Says } from './src/Says'

/** @type {Function|Says} */
const says = new Says()

/** @type {Function} */
const ros = says.roster.bind(says)

export { Says, says, ros }
