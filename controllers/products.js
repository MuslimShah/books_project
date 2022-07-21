const Product = require("../models/product");
// const products = [];
exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render("add-product", {
        pageTitle: "add-product",
        path: "/admin/add-product",
    });
};
exports.getPostProduct = async(req, res, next) => {
    // products.push({ title: req.body.title });
    const product = new Product(req.body.title);
    await product.save();
    res.redirect("/shop");
};
exports.getProducts = async(req, res, next) => {
    // const items = adminData.products;
    const products = await Product.fetchAll()
    res.render("shop", {
        product: products,
        pageTitle: "shop",
        path: "/shop",
    });


};