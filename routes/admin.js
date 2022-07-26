const express = require("express");
const adminContoller = require("../controllers/admin");
const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", adminContoller.getAddProduct);

// /admin/admin-product => GET
router.get("/products", adminContoller.getAdminProducts);

// /admin/add-product => POST
router.post("/add-product", adminContoller.getPostProduct);
// /admin/edit-product => GET
router.get("/edit-product/:product_id", adminContoller.getEdiProduct);
// /admin/edit-product => POST
router.post("/edit-product", adminContoller.postEditProduct);
//admind/delete-product
router.post("/delete-product", adminContoller.postDeleteProduct);

router.post("/delete-cart-product", adminContoller.postDeleteCartProduct);

module.exports = router;
