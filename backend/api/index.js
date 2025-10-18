const serverless = require("serverless-http");
const app = require("./server"); // your server.js

module.exports = serverless(app);
