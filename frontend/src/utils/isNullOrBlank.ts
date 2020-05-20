export const isNullOrBlank = (value: null | string) => {
  if (value === "null") {
    return true
  } else if (value === null) {
    return true
  } else if ( value.length === 0 ) {
   return true
  }
  return false
}