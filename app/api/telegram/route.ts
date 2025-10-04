import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';
//import Cors from 'cors';

/**
const cors = Cors({
  methods: ['POST'],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse<string[]>) {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
 */
export async function GET(request: Request) {
  try {
    const response = await fetch(`https://t.me/s/visapollari`);
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const searchContext = `.tgme_widget_message`;
    const telegramMessages = $(searchContext)
      .toArray()
      .map((x) => $(x).html())
      .filter((x) => x !== null && x !== undefined);
    telegramMessages.shift();
    return NextResponse.json(telegramMessages, {
      headers: {
        'Cache-Control': 's-maxage=1, stale-while-revalidate',
      },
    });
  } catch (e) {
    return NextResponse.json(
      {
        error: `Internal server error ${e instanceof Error ? e.message : JSON.stringify(e)}`,
      },
      { status: 500 },
    );
  }
}
