const express = require("express");
const router = express.Router();

const requestsQuarterController = require("../Controllers/RequestQuarterController");

router.get("/", requestsQuarterController.get_all_requests);

router.get("/:id", requestsQuarterController.get_requests_by_id);

router.post("/", requestsQuarterController.create_requests);

router.put("/:id", requestsQuarterController.update_requests);

router.delete("/:id", requestsQuarterController.delete_requests);

// route for approve_requests
router.put("/approve/:id", requestsQuarterController.approve_requests);

module.exports = router;
