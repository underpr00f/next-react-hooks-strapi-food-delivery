module.exports.filterObjWithBlacklist = (blacklist, obj) => {
  // REMOVE USER FROM RESPONSE
  const keys = Object.keys(obj)
  const filteredKeys = keys.filter((key) => !blacklist.includes(key))

  const filteredObj = filteredKeys.reduce((result, key) => {
    result[key] = obj[key]
    return result
  }, {})
  return filteredObj
}
