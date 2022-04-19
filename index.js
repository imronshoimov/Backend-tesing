require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/index");
const routes = require("./routes/index");

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  config.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("There is an ERROR in connecting to mongoDB");
    }
  }
);

app.use(routes);

app.listen(config.PORT, () => {
  console.log("Server is running on http://localhost:" + config.PORT);
});
