const express = require("express");
const mongoose = require("mongoose");
//Express Router - pentru endpoints - Pachet extra de la express
const router = express.Router();

const Product = require("../models/product");

//GET  -  http request methods

// Creare http methods for endpointul /products

router.post("/", (request, response, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: request.body.name,
    price: request.body.price,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      response.status(201).json({
        message: "Handling POST request to /products",
        createdProduct: result,
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
});

router.get("/", (request, response, next) => {
  Product.find()
    .exec()
    .then((docs) => {
      console.log(docs);
      // if (docs.length >= 0) {
      response.status(200).json(docs);
      // } else {
      //   response.status(404).json({
      //     message: "No information here",
      //   });
      // }
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
});

//creare http methods pentru fiecare id din endpointul /products

router.get("/:productId", (request, response, next) => {
  const id = request.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("From Database", doc);
      if (doc) {
        response.status(200).json(doc);
      } else {
        response.status(404).json({
          message: "No valid entry found for provided ID",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
});

router.patch("/:productId", (request, response, next) => {
  const id = request.params.productId;
  const updateOps = {};
  for (const ops of request.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then((resp) => {
      response.status(200).json({
        res: resp,
        success: true,
        message: "Successfully uploaded!",
      });
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
        success: false,
        message: "Response failed to fetch",
      });
    });
});

router.delete("/:productId", (request, response, next) => {
  const id = request.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      response.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      response.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
