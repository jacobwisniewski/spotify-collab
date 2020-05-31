export const isNullOrBlank = (value: null | string): boolean => {
  if (value === null) {
    return true
  } else if (value.length === 0) {
    return true
  }
  return false
}
