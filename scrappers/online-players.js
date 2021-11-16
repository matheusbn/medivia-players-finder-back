const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const Login = require('./models/login')
const Scrape = require('./models/scrape')
const db = require('./database')

puppeteer.use(StealthPlugin())

const browserWidth = 1200
const broswerHeight = 960

const scrape = async () => {
  await db.connect()

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 250,
  })

  const [page] = await browser.pages()

  await page.setViewport({
    width: browserWidth,
    height: broswerHeight
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
