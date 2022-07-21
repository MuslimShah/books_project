const Product = require("../models/product");
exports.getProducts = async(req, res, next) => {
    const products = await Product.fetchAll();
    res.render("shop/product-list", {
        product: products,
        pageTitle: "All Products",
        path: "/products",
    });
};
exports.getIndex = async(req, res, next) => {
    const products = await Product.fetchAll();
    res.render("shop/index", {
        product: products,
        pageTitle: "shop",
        path: "/",
    });
};
// cart 
exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
    });
};
// checkout
exports.getCheckOut = (req, res, next) => {
        res.render("shop/checkout", {
            pageTitle: "Checkout",
            path: "/checkout",
        });
    }
    //orders
exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {
        pageTitle: "Your Orders",
        path: "/orders",
    });
};