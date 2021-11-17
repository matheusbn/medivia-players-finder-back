const jsonfile = require('jsonfile')

module.exports = (cookies) => {
  jsonfile.writeFile('./last-run-cookies.json', cookies, { spaces: 2 }, (error) => {
    if (error) console.log(error)
    console.log('Cookies successfully written')
  })
}
