const express = require("express");
const app = express();

//pachet pentru monitorizarea metodele http in consola
const morgan = require("morgan");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// Import endpointul products.js // orders.js ss
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

mongoose.connect(
  "mongodb+srv://cristian-bad:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0.gnbuedj.mongodb.net/?retryWrites=true&w=majority"
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Header",
    "Origin,X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (request.method === "OPTIONS") {
    response.header(
      "Access-Control-Allow-Methods",
      "PUT, POST, PATCH, DELETE, GET"
    );
    return response.status(200).json({});
  }
  next();
});

//Routele care trebuie sa manipuleze cererile
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

app.use((request, response, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, request, response, next) => {
  response.status(error.status || 500);
  response.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
