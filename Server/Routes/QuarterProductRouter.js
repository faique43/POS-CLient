const express = require("express");
const router = express.Router();

const quarterProductController = require("../Controllers/QuarterProductController");

router.get("/", quarterProductController.get_all_quarterproduct);

router.get("/:id", quarterProductController.get_by_id);

router.post("/", quarterProductController.createQuarterProduct);

router.put("/:id", quarterProductController.updateQuarterProduct);

router.delete("/:id", quarterProductController.deleteQuarterProduct);

module.exports = router;
