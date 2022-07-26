const Product = require("../models/product");
const { post } = require("../routes/admin");
const Cart = require("../models/cart");
exports.getProducts = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("shop/product-list", {
    prods: products,
    pageTitle: "All Products",
    path: "/products",
  });
};
exports.getIndex = async (req, res, next) => {
  const products = await Product.fetchAll();
  res.render("shop/index", {
    prods: products,
    pageTitle: "shop",
    path: "/",
  });
};
// cart  ==>GET
exports.getCart = async (req, res, next) => {
  const cart = await Cart.fetchCart(); //fetching products that are saved in cart
  const allProducts = await Product.fetchAll();
  let filteredProducts = [];
  allProducts.forEach((product) => {
    const cartProductData = cart.product.find(
      (prod) => product.product_id === prod.id
    );
    if (cartProductData) {
      filteredProducts.push({
        product: product,
        qty: cartProductData.qty,
        totalPrice: cart.totalPrice,
      });
    }
  });

  res.render("shop/cart", {
    pageTitle: "Your Cart",
    product: filteredProducts,
    path: "/cart",
  });
};
// cart  ==>POST
exports.postCart = async (req, res, next) => {
  const product_id = req.body.productId;
  const product = await Product.getByProductId(product_id);
  const price = product.price;
  Cart.addProduct(product_id, price);
  res.redirect("/cart");
};

// checkout
exports.getCheckOut = (req, res, next) => {
  res.render("shop/checkout", {
    pageTitle: "Checkout",
    path: "/checkout",
  });
};
//orders
exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
  });
};
//details
exports.getProductDetails = async (req, res, next) => {
  const product_id = req.params.product_id;
  const product = await Product.getByProductId(product_id);
  res.render("shop/product-detail", {
    pageTitle: "Your details",
    product: product,
    path: "/products",
  });
};
