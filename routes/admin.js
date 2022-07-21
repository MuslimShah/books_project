const express = require("express");
const productContoller = require("../controllers/products");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productContoller.getAddProduct);

// /admin/add-product => POST
router.post("/add-product", productContoller.getPostProduct);
module.exports = router;