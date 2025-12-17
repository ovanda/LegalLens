const express = require("express");
const router = express.Router();
const legalController = require("../controllers/legalController");

router.post("/ask", legalController.ask);
module.exports = router;


