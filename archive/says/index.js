import { Says } from './src/Says'

/** @type {Function|Says} */
const says = new Says()

/** @type {Function} */
// const ros = says.roster.bind(says)
const ros = (name) => says.roster(name)

export { Says, says, ros }
