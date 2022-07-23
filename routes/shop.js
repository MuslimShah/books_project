const express = require("express");
const shopContoller = require("../controllers/shop");
const router = express.Router();
//client home
router.get("/", shopContoller.getIndex);
//client products
router.get("/products", shopContoller.getProducts);
//client cart
router.get("/cart", shopContoller.getCart);

// client cart post
router.post("/cart", shopContoller.postCart);
//checkout
router.get("/checkout", shopContoller.getCheckOut);
//orders
router.get("/orders", shopContoller.getOrders);
//details
router.get("/product-detail/:product_id", shopContoller.getProductDetails);


module.exports = router;