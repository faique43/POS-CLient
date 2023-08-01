const express = require("express");
const router = express.Router();

const requestsLayerController = require("../Controllers/RequestsLayerController");

router.get("/", requestsLayerController.get_all_requests);

router.get("/:id", requestsLayerController.get_requests_by_id);

router.post("/", requestsLayerController.create_requests);

router.put("/:id", requestsLayerController.update_requests);

router.delete("/:id", requestsLayerController.delete_requests);

// route for approve_requests
router.put("/approve/:id", requestsLayerController.approve_requests);

module.exports = router;
