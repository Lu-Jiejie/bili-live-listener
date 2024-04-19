import { describe, expect, it } from 'vitest'
import { int2ColorHex, rgb2Int } from '../src/utils/color'

describe('test', () => {
  it.skip('int2Hex should work', () => {
    const ints = [6809855, 398668, 6850801]
    const hexs = ints.map(int2ColorHex)
    expect(hexs).toMatchInlineSnapshot(`
      [
        "#67e8ff",
        "#06154c",
        "#6888f1",
      ]
    `)
  })
  it('colorHex2Int should work', () => {
    expect(int2ColorHex(1725515)).toMatchInlineSnapshot('"#1a544b"')
    expect(rgb2Int(26, 84, 75)).toMatchInlineSnapshot('1725515')
  })
})
