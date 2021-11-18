const fs = require('fs').promises
const { day } = require('./helpers')

module.exports = async page => {
  try {

  const cookiesString = await fs.readFile('./last-run-cookies.json')
  const cookies = JSON.parse(cookiesString)

  const cfClearance = cookies.find(c => c.name === "cf_clearance")
  console.log(cfClearance)

  const cookieTimeLeft =
    (new Date(cfClearance.expires * 1000) - new Date()) / day

  console.log(
    'Cookie time left:',
    Math.round(cookieTimeLeft * 100) / 100 + ' days'
  )

  await page.setCookie(...cookies).catch(error => console.error(error))
  } catch(error) {
    console.log("Error setting cookies:", error.message)
  }
}
