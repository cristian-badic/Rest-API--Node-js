const express = require("express");

//Express Router - pentru endpoints - Pachet extra de la express
const router = express.Router();

//GET  -  http request methods

// Creare http methods for endpointul /products
router.get("/", (request, response, next) => {
  response.status(200).json({
    message: "Handling GET request to /products",
  });
});

router.post("/", (request, response, next) => {
  response.status(200).json({
    message: "Handling POST request to /products",
  });
});

//creare http methods pentru fiecare id din endpointul /products

router.get("/:productId", (request, response, next) => {
  const id = request.params.productId;
  if (id === "special") {
    response.status(200).json({
      message: "You Discovered the special Id",
      id: id,
    });
  } else {
    response.status(200).json({
      message: "You've got and id",
      id: id,
    });
  }
});

router.patch("/:productId", (request, response, next) => {
  response.status(200).json({
    message: "Updated product!",
  });
});

router.delete("/:productId", (request, response, next) => {
  response.status(200).json({
    message: "Deleted Product",
  });
});

module.exports = router;
