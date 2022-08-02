const express = require("express");
const app = express();
///commm

app.use((request, response, next) => {
  response.status(200).json({
    message: "It works",
  });
});

module.exports = app;
