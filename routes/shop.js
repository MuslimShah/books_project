const express = require("express");
const productContoller = require("../controllers/products");
const router = express.Router();
router.get("/", productContoller.getProducts);

module.exports = router;