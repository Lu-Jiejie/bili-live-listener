export const int2Color = (int: number): string => {
  const hex = int.toString(16)
  return hex.length == 5 ? `#0${hex}` : `#${hex}`
}

export const randomText = (length: number): string => {
  return Math.random()
    .toString()
    .slice(2, 2 + length)
}
