const Product = require("../models/product");
const { post } = require("../routes/admin");
exports.getProducts = async(req, res, next) => {
    const products = await Product.fetchAll();
    res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
    });
};
exports.getIndex = async(req, res, next) => {
    const products = await Product.fetchAll();
    res.render("shop/index", {
        prods: products,
        pageTitle: "shop",
        path: "/",
    });
};
// cart  ==>GET
exports.getCart = (req, res, next) => {
    res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
    });
};
// cart  ==>POST
exports.postCart = (req, res, next) => {
    const product_id = req.body.productId;
    console.log(product_id);
    res.redirect('/cart')
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
//details
exports.getProductDetails = async(req, res, next) => {
    const product_id = req.params.product_id;
    const product = await Product.getByProductId(product_id);
    res.render("shop/product-detail", {
        pageTitle: "Your details",
        product: product,
        path: "/products",
    });
};;