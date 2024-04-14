export function yearComparison(initYear: number) {
  const currentYear = new Date().getFullYear()
  if (initYear === currentYear) {
    return currentYear.toString()
  }

  return `${initYear}-${currentYear}`
}
