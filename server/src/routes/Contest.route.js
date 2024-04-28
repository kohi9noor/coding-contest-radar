const express = require("express");
const {
  contestRemindController,
} = require("../controllers/Contest.Controller");

const router = express.Router();

router.post("/contests", contestRemindController);

module.exports = router;
