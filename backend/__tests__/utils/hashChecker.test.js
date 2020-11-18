const hashChecker = require('../../utils/hashChecker').hashChecker
// require('dotenv').config()

//NOTIFICATION SECRET NEED TO GET FROM YOOMONEY INTO .env YANDEX_MONEY_SECRET
let fakeData
let notification_secret

beforeEach(() => {
  fakeData = {
    notification_type: 'p2p-incoming',
    bill_id: '',
    amount: '286.19',
    datetime: '2020-11-09T19:02:49Z',
    codepro: 'false',
    sender: '41001000040',
    sha1_hash: '39172f977efa7d584b45145bc6effefcdab127b1',
    test_notification: 'true',
    operation_label: '',
    operation_id: 'test-notification',
    currency: '643',
    label: ''
  }

  notification_secret = "cNKku7BtSlGLVe8nEDVeUfH7"
})
describe('hashchecker sha', () => {
  test('hashchecker has secret', async () => {
    expect(notification_secret).toBeTruthy()
  })
  test('hashchecker sha test', async () => {
    expect(hashChecker(fakeData, notification_secret)).toBeTruthy()
  })
})