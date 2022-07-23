const Product = require("../models/product");
// admin add-products==>GET
exports.getAddProduct = (req, res, next) => {
    res.render("admin/add-product", {
        pageTitle: "add-product",
        path: "/admin/add-product",
    });
};
// admin products==>GET
exports.getAdminProducts = async(req, res, next) => {
    const products = await Product.fetchAll();
    res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
    });
};
// admin add-products==>POST
exports.getPostProduct = async(req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const price = req.body.price;
    const product_id = Math.random().toString();
    const product = new Product(title, imageUrl, description, price, product_id);
    await product.save();
    res.redirect("/");
};