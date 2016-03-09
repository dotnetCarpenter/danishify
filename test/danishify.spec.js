/* globals describe, it, expect */

'use strict'

import danishify from '../js/danishify.js'

console.dir(danishify)

describe('danishify.convert', function () {
  it('can convert ae to æ', function () {
    const expected = 'mægler'
    const actual = danishify.convert('maegler')
    expect(actual).toBe(expected)
  });
})
