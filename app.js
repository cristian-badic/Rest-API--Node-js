const express = require("express");
const app = express();

// Import endpointul products.js // orders.js
const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);

module.exports = app;
