const express = require("express");
const productContoller = require("../controllers/admin");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", productContoller.getAddProduct);
router.get("/products", productContoller.getAdminProducts);

// /admin/add-product => POST
router.post("/add-product", productContoller.getPostProduct);
module.exports = router;