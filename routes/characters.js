const { Router } = require("express");
const getCharacterDetails = require("../scrappers/getCharacterDetails");

const router = Router();

router.route("/:characterName").get(async (req, res, next) => {
  console.log(req.params.characterName);
  const characterDetails = await getCharacterDetails(req.params.characterName);
  res.send(characterDetails);
});

module.exports = router;
