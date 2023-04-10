const express = require("express");
const router = express.Router();

// import all controllers from customerController
const customerController = require("../controllers/customerController");

// @route   GET api/customers
// @desc    Get all customers
// @access  Public
router.get("/", customerController.getCustomers);

// @route   GET api/customers/:id
// @desc    Get customer by ID
// @access  Public
router.get("/:id", customerController.getCustomerById);

// @route   POST api/customers
// @desc    Create a customer
// @access  Private
router.post("/", customerController.createCustomer);

// @route   PUT api/customers/:id
// @desc    Update a customer
// @access  Private
router.put("/:id", customerController.updateCustomer);

// @route   DELETE api/customers/:id
// @desc    Delete a customer
// @access  Private
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
