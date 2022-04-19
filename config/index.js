const config = {
  MONGO_URL: getConf("MONGO_URL", "mongodb://localhost:27017/backend_testing"),
  PORT: getConf("PORT", 8080),
};

function getConf(name, def = "") {
  if (process.env[name]) {
    return process.env[name];
  }
  return def;
}

module.exports = config;
