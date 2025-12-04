const express = require("express");
const router = express.Router();
const pagarController = require("../controllers/pagarController");

router.post("/", pagarController.criarCobranca);

module.exports = router;
