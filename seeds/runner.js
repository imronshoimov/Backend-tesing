const fs = require("fs");
const path = require("path");

async function runner() {
  const dir = fs.readdirSync(__dirname).filter((f) => f !== "runner.js");

  for (let i = 0; i < dir.length; i++) {
    if (dir[i] !== "runner.js") {
      const seed = require(__dirname + "/" + dir[i]);
      const model = require(path.resolve("models", seed.modelFile));

      const user = await model.create(seed.data);
      await user.save();
    }
  }
}

module.exports = runner;
