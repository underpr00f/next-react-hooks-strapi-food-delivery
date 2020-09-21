export function checkIsArray(array) {
    if (Array.isArray(array) && array.length) {
      return true
    }
    return false
  }