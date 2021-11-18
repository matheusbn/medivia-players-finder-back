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
        const label = item.children[0].innerText.replace(":", "");
        const value = item.children[1].innerText;

        character[label] = value;
      });

      return {
        name: character["name"],
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

    console.log(characterData)

    // const character = await Character.create(characterData);

    return characterData;
  });
};

module.exports = getCharacterDetails;
