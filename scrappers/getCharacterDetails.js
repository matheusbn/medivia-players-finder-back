const Character = require("../models/character");
const scrape = require("./scrape");
const querystring = require("querystring");

const getCharacterDetails = async (characterName) => {
  return await scrape(async (page) => {
    await page.goto(
      `https://medivia.online/community/character/${querystring.escape(
        characterName
      )}`,
      {
        waitUntil: "networkidle0",
      }
    );

    await page.waitForSelector(".med-width-100");

    const characterData = await page.evaluate(() => {
      const character = {};
      Array.from(
        document
          .evaluate(
            '//div[text()="Information"]',
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
          )
          .singleNodeValue.nextElementSibling.querySelector(
            ".med-white-space-normal"
          ).children
      ).forEach((item) => {
        const label = item.children[0].innerText;
        const value = item.children[1].innerText;
        character[label] = value;
        console.log(value);
        console.log(label);
      });
      console.log(character);

      return {
        name: character[0],
        position: character["position"],
        sex: character["sex"],
        profession: character["profession"],
        level: character["level"],
        world: character["world"],
        residence: character["residence"],
        house: character["house"],
        lastLogin: character["last login"],
        status: character["status"],
        accountStatus: character["account status"],
      };
    });
    const character = await Character.create(characterData);
    console.log(characterData, character);
    return character;
  });
};

module.exports = getCharacterDetails;
