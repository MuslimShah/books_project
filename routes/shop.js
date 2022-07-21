const express = require("express");
const shopContoller = require("../controllers/shop");
const router = express.Router();
router.get("/", shopContoller.getIndex);
router.get("/products", shopContoller.getProducts);
router.get("/cart", shopContoller.getCart);
router.get("/checkout", shopContoller.getCheckOut);
router.get("/orders", shopContoller.getOrders);


module.exports = router;