const fs = require("fs");
const Cart = require("./cart");
const path = require("path");
let p = path.join(__dirname, "../data/data.json");
function getAllData() {
  return new Promise(async (resolve, reject) => {
    try {
      const products = JSON.parse(fs.readFileSync(p, "utf-8"));
      return resolve(products);
    } catch (error) {
      return reject("fetching data error: " + error);
    }
  });
}

module.exports = class Product {
  constructor(product_id, title, imageUrl, description, price) {
    this.product_id = product_id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  // ====================== SAVING DATA INTO THE FILE =========================
  save() {
    return new Promise(async (resolve, reject) => {
      try {
        if (this.product_id) {
          // this is to check if the product already exists
          const product = await getAllData();
          let existingProductIndex = product.findIndex(
            (prod) => prod.product_id === this.product_id
          );

          let updatedProducts = [...product];
          updatedProducts[existingProductIndex] = this;
          fs.writeFileSync(p, JSON.stringify(updatedProducts));
        }
        // ==================== IF A PRODUCT DOES NOT EXIST =======================
        else {
          this.product_id = Math.random().toString();
          let products;
          if (fs.existsSync(p)) {
            products = JSON.parse(fs.readFileSync(p, "utf-8"));
          }
          products.push(this);
          fs.writeFileSync(p, JSON.stringify(products));
        }
        return resolve(true);
      } catch (error) {
        return reject("save product error: " + error);
      }
    });
  }

  // ============= FETCHING ALL DATA FROM THE FILE ===================
  static fetchAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const products = JSON.parse(fs.readFileSync(p, "utf-8"));
        return resolve(products);
      } catch (error) {
        return reject("fetching data error: " + error);
      }
    });
  }

  // ================= GETTING DATA BY PRODUCT ID ========================
  static async getByProductId(product_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.fetchAll();

        const foundProduct = product.find((prod) => {
          return prod.product_id === product_id;
        });

        return resolve(foundProduct);
      } catch (error) {
        return reject("fetching By Id Error:" + error);
      }
    });
  }
  //================= DELETING PRODUCT FORM FILE ====================
  static async delelteProduct(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await this.getByProductId(id);
        let allProducts = await this.fetchAll();
        const product_index = allProducts.findIndex((prod) => {
          return prod.product_id === id;
        });
        allProducts.splice(product_index, 1);
        fs.writeFileSync(p, JSON.stringify(allProducts));
        const price = product.price;
        console.log(price);

        await Cart.deleteProduct(id, price);

        return resolve(true);
      } catch (error) {
        return reject(error);
      }
    });
  }
};
