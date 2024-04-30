export function int2ColorHex(int: number) {
  return `#${int.toString(16).padStart(6, '0')}`
}

export function colorHex2Int(hex: string) {
  return Number.parseInt(hex.slice(1), 16)
}

export function colorHex2Rgb(hex: string) {
  const int = colorHex2Int(hex)
  return {
    r: int >> 16 & 0xFF,
    g: int >> 8 & 0xFF,
    b: int & 0xFF,
  }
}

export function rgb2Int(r: number, g: number, b: number) {
  return r << 16 | g << 8 | b
}
