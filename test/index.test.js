require("dotenv").config();
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../test");
const config = require("../config/index");
const seed = require("../seeds/runner");

const inMemoryServer = MongoMemoryServer.create();

let server;

before(async () => {
  const mongod = await inMemoryServer;

  const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
  };

  await mongoose.connect(uri, mongooseOpts);

  await seed();

  server = app.listen(config.PORT, () => {
    console.log("Server is running on http://localhost:" + config.PORT);
  });
});

after(async () => {
  const mongod = await inMemoryServer;

  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();

  server.close(() => {
    process.exit(0);
  });

  setTimeout(() => {
    process.exit(1);
  }, 5000);
});
