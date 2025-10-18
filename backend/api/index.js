const serverless = require("serverless-http");
const app = require("../server"); // server.js with cors configured

module.exports = serverless(app);
