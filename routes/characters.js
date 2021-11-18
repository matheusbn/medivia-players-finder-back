const { Router } = require("express");
const getCharacterDetails = require("../scrappers/getCharacterDetails");
const getOnlineCharacters = require("../scrappers/getOnlineCharacters");
const Login = require("../models/login");

const router = Router();

router.route("/online/:world").get(async (req, res, next) => {
  const onlineCharacters = await getOnlineCharacters(req.params.world)
  res.send(onlineCharacters);
});

router.route("/:characterName").get(async (req, res, next) => {
  console.log(req.params.characterName);
  const characterDetails = await getCharacterDetails(req.params.characterName);
  res.send(characterDetails);
});

module.exports = router;
