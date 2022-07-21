const express = require("express");
const adminContoller = require("../controllers/admin");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminContoller.getAddProduct);

// /admin/admin-product => GET
router.get("/products", adminContoller.getAdminProducts);

// /admin/add-product => POST
router.post("/add-product", adminContoller.getPostProduct);
module.exports = router;