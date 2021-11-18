const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const db = require("../database");
const saveCookies = require("../utils/saveCookies");
const setCookies = require("../utils/setCookies");

puppeteer.use(StealthPlugin());

const browserWidth = 1200;
const broswerHeight = 960;

const scrape = async (callback) => {
  await db.connect();

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
    args: [
      `--window-size=${browserWidth},${broswerHeight}`,
      "--disable-infobars",
    ],
  });

  const [page] = await browser.pages();

  await page.setViewport({
    width: browserWidth,
    height: broswerHeight,
  });

  await setCookies(page)

  const callbackResult = await callback(page);

  const cookies = await page.cookies();
  await saveCookies(cookies);

  // await browser.close();
  return callbackResult;
};

module.exports = scrape;
