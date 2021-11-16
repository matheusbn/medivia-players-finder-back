const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const Login = require('./models/login')
const Scrape = require('./models/scrape')
const mongoose = require('mongoose')

puppeteer.use(StealthPlugin())

const browserWidth = 1200
const broswerHeight = 960

const scrape = async () => {
  await mongoose.connect('mongodb+srv://admin:salvedaniel@cluster0.kfu7a.mongodb.net/medivia?retryWrites=true&w=majority').catch(console.error);

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 500,
    args: [
      // `--window-size=${browserWidth},${broswerHeight}`,
      // '--disable-infobars',
    ],
  })

  const [page] = await browser.pages()

  // await page.setUserAgent(
  //   '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
  // )
  await page.setViewport({
    width: browserWidth,
    height: broswerHeight,
    // deviceScaleFactor: 1,
  })

  await page.goto(`https://medivia.online/community/online/pendulum`, {
    waitUntil: 'networkidle0',
  })

  await page.waitForSelector('.content ul')

  try {
    const logins = await page.evaluate(() => {
      const logins = Array.from(document.querySelector('.content ul').children)
        .slice(1)
        .map(li => {
          const [lastLogin, name, vocation, level] = li.children

          return {
            lastLogin: lastLogin.innerText,
            name: name.children[0].innerText,
            vocation: vocation.innerText,
            level: level.innerText,
          }
        })

      return logins
    })

    const scrape = await Scrape.create({})
    console.log(scrape)
    const insertRes = await Login.insertMany(logins.map(s => ({...s, scrapeId: scrape._id})))
    console.log(insertRes)

    console.log(logins)
  } catch (error) {
    console.error(error)
  } finally {
    await browser.close();
  }
}

scrape()
