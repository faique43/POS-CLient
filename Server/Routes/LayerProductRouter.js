const express = require("express");
const router = express.Router();

const layerProductController = require("../Controllers/LayerProductController");

router.get("/", layerProductController.getLayerProducts);

router.post("/", layerProductController.createLayerProduct);

router.put("/:id", layerProductController.updateLayerProduct);

router.delete("/:id", layerProductController.deleteLayerProduct);

module.exports = router;
