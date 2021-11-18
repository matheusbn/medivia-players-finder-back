const fs = require('fs').promises

module.exports = async page => {
  try {

  const cookiesString = await fs.readFile('./last-run-cookies.json')
  const cookies = JSON.parse(cookiesString)
  console.log(cookies.find(c => c.name === "cf_clearance"))

  // const cookieTimeLeft =
  //   (new Date(savedCookies[0].expires * 1000) - new Date()) / oneDay


  // console.log(
  //   'Cookie time left:',
  //   Math.round(cookieTimeLeft * 100) / 100 + ' days'
  // )

  await page.setCookie(...cookies).catch(error => console.error(error))
  } catch(error) {
    console.log("Error setting cookies:", error.message)
  }
}
