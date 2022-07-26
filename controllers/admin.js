const Cart = require("../models/cart");
const Product = require("../models/product");
// admin add-products==>GET
exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "add-product",
    path: "/admin/add-product",
    editMode: false,
  });
};
// admin products==>GET
exports.getAdminProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("admin/products", {
    prods: products,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};
// admin add-products==>POST
exports.getPostProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(null, title, imageUrl, description, price);
  await product.save();
  res.redirect("/");
};
// admin edit-products==>GET
exports.getEdiProduct = async (req, res, next) => {
  const editMode = req.query.edit;
  const product_id = req.params.product_id;
  const product = await Product.getByProductId(product_id);
  if (!editMode) {
    return res.redirect("/");
  } else {
    res.render("admin/edit-product", {
      pageTitle: "add-product",
      path: "/admin/edit-product",
      editMode: editMode,
      product: product,
    });
  }
};
// admin edit-products==>GET
exports.postEditProduct = async (req, res, next) => {
  const product_id = req.body.product_id;
  const updateTitle = req.body.title;
  const UpdateImageUrl = req.body.imageUrl;
  const updateDescription = req.body.description;
  const updatePprice = req.body.price;
  const product = new Product(
    product_id,
    updateTitle,
    UpdateImageUrl,
    updateDescription,
    updatePprice
  );
  await product.save();
  res.redirect("/");
};
//admin delete product ==>POST
exports.postDeleteProduct = async (req, res, next) => {
  const product_id = req.body.product_id;
  await Product.delelteProduct(product_id);
  res.redirect("/admin/products");
};
exports.postDeleteCartProduct = async (req, res, next) => {
  const product_id = req.body.product_id;

  const product = await Product.getByProductId(product_id);
  const price = product.price;
  await Cart.deleteProduct(product_id, price);
  res.redirect("/cart");
};
