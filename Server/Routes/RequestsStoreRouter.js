const express = require("express");
const router = express.Router();

const requestsStoreController = require("../Controllers/RequestsStoreController");

// @route   GET api/requestsStore
// @desc    Get all requestsStore
// @access  Public
router.get("/", requestsStoreController.get_all_requests);

// @route   GET api/requestsStore/:id
// @desc    Get requestsStore by ID
// @access  Public
router.get("/:id", requestsStoreController.get_requests_by_id);

// @route   POST api/requestsStore
// @desc    Create a requestsStore
// @access  Private
router.post("/", requestsStoreController.create_requests);
// @route   PUT api/requestsStore/:id
// @desc    Update a requestsStore
// @access  Private
router.put("/:id", requestsStoreController.update_requests);

// @route   DELETE api/requestsStore/:id
// @desc    Delete a requestsStore
// @access  Private
router.delete("/:id", requestsStoreController.delete_requests);

// Approve requests
router.put("/approve/:id", requestsStoreController.approve_requests);

module.exports = router;
