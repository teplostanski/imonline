type TextStyleFunction = (text: string) => string

export function colorText(styleFn: TextStyleFunction, text: string, noColor: boolean): string {
  const isNoColor =
    Boolean(process.env.NO_COLOR === '1' ||
    process.env.NCHE_NO_COLOR === '1' ||
    noColor === true)

  if (isNoColor) {
    return text
  }

  return styleFn(text)
}
