import * as cheerio from 'cheerio';
import Cors from 'cors'
import type { NextApiRequest, NextApiResponse } from 'next'

const cors = Cors({
  methods: ['POST'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req:NextApiRequest, res: NextApiResponse<string[]>,
) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const search =  async (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  await runMiddleware(req, res)
  if (req.method === 'GET') {
    try {
      const response = await fetch(`https://t.me/s/visapollari`)
      const htmlString = await response.text()
      const $ = cheerio.load(htmlString)
      const searchContext = `.tgme_widget_message`
      const telegramMessages = $(searchContext).toArray().map((x) => $(x).html()).filter((x) => x !== null && x !== undefined);
      res.statusCode = 200
      telegramMessages.shift();
      return res.json(telegramMessages as string[])
    } catch (e) {
      console.log(e)
      res.statusCode = 404
      return res.json([])
    }
  }
  else {
    return res.status(404).json([])
  }
}

export default search