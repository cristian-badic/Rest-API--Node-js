//Setarea serverului Import HTTP
//IMPORT APP FROM APP.JS
//CREAREA unui server

const http = require("http");
const app = require("./app");

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port);
