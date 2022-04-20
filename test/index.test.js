require("dotenv").config();
const server = require("../test");

function shutDown() {
  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(1);
  }, 10000);
}

after(async () => {
  await shutDown();
});
