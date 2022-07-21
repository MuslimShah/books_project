const express = require("express");
const shopContoller = require("../controllers/shop");
const router = express.Router();
//client home
router.get("/", shopContoller.getIndex);
//client products
router.get("/products", shopContoller.getProducts);
//client cart
router.get("/cart", shopContoller.getCart);
//checkout
router.get("/checkout", shopContoller.getCheckOut);
//orders
router.get("/orders", shopContoller.getOrders);
//details
router.get("/product-detail/:id", shopContoller.getDetails);


module.exports = router;