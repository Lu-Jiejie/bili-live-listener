import { describe, expect, it } from 'vitest'
import { colorHex2Rgb, int2ColorHex } from '../src/utils/color'

describe('test', () => {
  it('int2Hex should work', () => {
    const hexs = ['#2A60B2', '#EDF5FF', '#405D85', '#3171D2', '#7497CD']
    const rgbs = hexs.map(colorHex2Rgb).map(rgbObj => `${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}`)
    expect(rgbs).toMatchInlineSnapshot(`
      [
        "42, 96, 178",
        "237, 245, 255",
        "64, 93, 133",
        "49, 113, 210",
        "116, 151, 205",
      ]
    `)
  })
  it('colorHex2Int should work', () => {
    expect(int2ColorHex(2951253)).toMatchInlineSnapshot('"#2d0855"')
  })
})
