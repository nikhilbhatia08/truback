const express = require('express');
const { userSignup, userLogin, userDetails } = require('../controllers/userController');

const router = express.Router();

router
    .post("/signup", userSignup)
    .post("/login", userLogin)
    .get("/details", userDetails)

module.exports = router;