const crypto = require("crypto")

module.exports.hashChecker = (response, notification_secret) => {
  const notification_type = response.notification_type
  const operation_id = response.operation_id
  const amount = response.amount
  const currency = response.currency
  const datetime = response.datetime
  const sender = response.sender
  const codepro = response.codepro
  const label = response.label
  const sha1_hash = response.sha1_hash
  const test_notification = response.test_notification
  const hash =
    notification_type +
    "&" +
    operation_id +
    "&" +
    amount +
    "&" +
    currency +
    "&" +
    datetime +
    "&" +
    sender +
    "&" +
    codepro +
    "&" +
    notification_secret +
    "&" +
    label //формируем хеш

  // const sha1 = hash('sha1', $hash); //кодируем в SHA1
  const sha1 = crypto.createHash("sha1").update(hash).digest("hex")
  // const sha1 = bcrypt.hashSync(hash);
  // console.log(sha1);
  if (sha1 === sha1_hash) {
    return true
  } else {
    return false
  }
}
