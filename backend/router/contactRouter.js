// package imports
const express = require('express');

// file imports
const { addContact, deleteContact, updateContact, getContacts, getContact } = require('../controller/contactController.js');
const verifyToken = require("../middleware/tokenAuth");

const router = express.Router();

// router

// add
// link       /api/contact/add
// access     public
router.route('/add').post(verifyToken, addContact);

// delete
// link       /api/contact/delete/:id
// access     public
router.route('/delete/:id').delete(verifyToken, deleteContact);

// update
// link       /api/contact/update/:id
// access     public
router.route('/update/:id').patch(verifyToken, updateContact);

// get all
// link       /api/contact/get
// access     public
router.route('/get').get(verifyToken, getContacts);

// get
// link       /api/contact/get/:id
// access     public
router.route('/get/:id').get(verifyToken, getContact);

module.exports = router;