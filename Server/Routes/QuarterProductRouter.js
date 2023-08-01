const express = require("express");
const router = express.Router();

const quarterProductController = require("../Controllers/QuarterProductController");

router.get("/", quarterProductController.getQuarterProducts);

router.post("/", quarterProductController.createQuarterProduct);

router.put("/:id", quarterProductController.updateQuarterProduct);

router.delete("/:id", quarterProductController.deleteQuarterProduct);

module.exports = router;
