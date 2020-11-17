const filterObjWithBlacklist = require('../../utils/filterObjWithBlacklist').filterObjWithBlacklist

let blacklist
let obj
let filterObj

beforeEach(() => {
  obj = {
    "user": {
      "email": "underfawfafawf@gmail.com",
      "password": "fawfafawfafzfgghdrhdrndME3gozi",
      "firstname": "john",
      "lastname": "doe",
    },
    "confirmed": false,
    "_id": "dwafafse4a",
    "message": "Hello10",
    "id": "5f9e34t3tgsgdd568814a"
  }
  blacklist = ["user", "message"]
  filterObj = filterObjWithBlacklist(blacklist, obj)
})

describe('blacklist in object', () => {
  test('is not blacklist in obj keys', () => {
    expect(filterObj).not.toHaveProperty(blacklist)
  })
  test('is in obj keys', () => {
    expect(filterObj).toHaveProperty("id")
  })
})