const Character = require("../models/character");
const scrape = require("./scrape");
const querystring = require("querystring");

const getCharacterDetails = async (characterName) => {
  await scrape(async (page) => {
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
      const character = Array.from(
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
      ).map((item) => item.children[1].innerText);

      return {
        name: character[0],
        position: character[1],
        sex: character[2],
        profession: character[3],
        level: character[4],
        world: character[5],
        residence: character[6],
        house: character[7],
        lastLogin: character[8],
        status: character[9],
        accountStatus: character[10],
      };
    });

    const character = await Character.create(characterData)
  });
};

module.exports = getCharacterDetails;
