export function int2ColorHex(int: number) {
  return `#${int.toString(16).padStart(6, '0')}`
}

export function colorHex2Int(hex: string) {
  return Number.parseInt(hex.slice(1), 16)
}

export function rgb2Int(r: number, g: number, b: number) {
  return r << 16 | g << 8 | b
}
