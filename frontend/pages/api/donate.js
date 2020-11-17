import Cors from 'cors'
import initMiddleware from '../../lib/initMiddleware'

import { hashChecker } from '../../utils/hashChecker'
import { provideDonate } from '../../utils/donateUtils'
// Initializing the cors middleware
// Initialize the cors middleware
const allowlist = ['https://yoomoney.ru']

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET', 'POST', 'OPTIONS'],
    origin: allowlist
  })
)

async function handler(req, res) {
  // Run cors
  await cors(req, res)

  if (req.method === 'POST') {
    const notification_secret = process.env.NEXT_PUBLIC_YANDEX_MONEY_SECRET //СЮДА ВСТАВИТЬ Секретный код выданый ВАМ ЯД

    const checkTransfer = hashChecker(req.body, notification_secret)
    if (checkTransfer) {
      const response = await provideDonate(req.body)
      return res.json({ status: 200, message: 'POST REQUEST SUCCESS!', response })
    }
    return res.json({ status: 401, message: 'POST REQUEST FAIL!', ...req.body })
  }
  // Rest of the API logic
  return res.status(405).json({ status: 405, error: 'Method not allowed!' })
}

export default handler
