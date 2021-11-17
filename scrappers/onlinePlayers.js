const Login = require('../models/login')
const Scrape = require('../models/scrape')
const scrape = require('./scrape')

scrape(async page => {
  await page.goto(`https://medivia.online/community/online/pendulum`, {
    waitUntil: 'networkidle0',
  })

  await page.waitForSelector('.content ul')

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
  const insertRes = await Login.insertMany(
    logins.map(s => ({ ...s, scrapeId: scrape._id }))
  )

  console.log(insertRes)
  console.log(logins)
})
