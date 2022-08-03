const express = require("express");
const router = express.Router();

// Creare http methods for endpointul /orders

router.get("/", (request, respone, next) => {
  respone.status(200).json({
    message: "Orders were fetched",
  });
});

router.post("/", (request, respone, next) => {
  respone.status(200).json({
    message: "Orders was created",
  });
});

//creare http methods pentru fiecare id din endpointul /orders

router.get("/:orderId", (request, respone, next) => {
  respone.status(200).json({
    message: "Orders details",
    orderId: request.params.orderId,
  });
});

router.delete("/:orderId", (request, respone, next) => {
  respone.status(200).json({
    message: "Orders deleted",
    orderId: request.params.orderId,
  });
});

module.exports = router;
