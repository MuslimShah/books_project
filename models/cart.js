const path = require("path");
const fs = require("fs");

// const p = path.join(__dirname, '..data/cart.json');
let p = path.join(__dirname, "../data/cart.json");

module.exports = class Cart {
  //============= ADDING ITEM TO THE CART AND CHECKING FOR EXISTING ALSO======
  static addProduct(id, productPrice) {
    return new Promise(async (resolve, reject) => {
      try {
        let cart = { product: [], totalPrice: 0 };
        let checkExisting = fs.existsSync(p);
        if (checkExisting) {
          cart = JSON.parse(fs.readFileSync(p, "utf-8"));
        }
        let existingProductIndex = cart.product.findIndex((prod) => {
          return prod.id === id;
        });
        const existingProduct = cart.product[existingProductIndex];
        let updatedProduct;
        if (existingProduct) {
          updatedProduct = { ...existingProduct };
          updatedProduct.qty = updatedProduct.qty + 1;
          // cart.product = [...cart.product]
          cart.product[existingProductIndex] = updatedProduct;
        } else {
          updatedProduct = { id: id, qty: 1 };
          cart.product = [...cart.product, updatedProduct];
        }
        cart.totalPrice = Number(cart.totalPrice) + Number(productPrice);
        fs.writeFileSync(p, JSON.stringify(cart), "utf-8");
        return resolve(true);
      } catch (error) {
        return reject("adding cart error :" + error);
      }
    });
  }
  //=============== deleting item from cart ================
  static deleteProduct(id, product_price) {
    return new Promise(async (resolve, reject) => {
      try {
        const cart = JSON.parse(fs.readFileSync(p, "utf-8")); //all products
        let updatedCart = { ...cart };
        const product = cart.product.find((prod) => prod.id === id);
        if (!product) {
          console.log("no such product found in cart");
          return resolve(true);
        }
        const productQty = product.qty;
        updatedCart.totalPrice =
          updatedCart.totalPrice - product_price * productQty;
        updatedCart.product = updatedCart.product.filter(
          (prod) => prod.id !== id //product with the find  with id of delete operation wil be removed
        );
        fs.writeFileSync(p, JSON.stringify(updatedCart), "utf-8");
        return resolve(true);
      } catch (error) {
        return reject("deleting cart error :" + error);
      }
    });
  }
  // ============== FETCHING CART =====================
  static fetchCart() {
    return new Promise(async (resolve, reject) => {
      try {
        let cart;
        if (fs.existsSync(p)) {
          cart = JSON.parse(fs.readFileSync(p, "utf-8"));
        } else {
          console.log("no cart found====");
        }
        return resolve(cart);
      } catch (error) {
        return reject("fetching cart error :" + error);
      }
    });
  }
};
