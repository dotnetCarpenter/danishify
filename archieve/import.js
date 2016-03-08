import danishify from './danishify.js'

console.dir(danishify)

const expected = 'mægler'
const actual = danishify.convert('maegler')
console.log('%s should be %s: %s', actual, expected, actual === expected)