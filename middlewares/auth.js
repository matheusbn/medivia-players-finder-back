module.exports = {
  requiredUser(req, res, next) {
    if (!req.userJwt) return res.status(401).end()
    next()
  }
}
