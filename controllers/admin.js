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
    res.render("admin/product", {
        product: products,
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
    const product = new Product(title, imageUrl, description, price);
    await product.save();
    res.redirect("/");
};