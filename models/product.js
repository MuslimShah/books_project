const fs = require("fs");
const path = require("path");
let p = path.join(__dirname, "../data/data.json");

module.exports = class Product {
    constructor(title, imageUrl, description, price, product_id) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
        this.product_id = product_id
    }
    save() {
        return new Promise(async(resolve, reject) => {
            try {

                const products = JSON.parse(fs.readFileSync(p, "utf-8"));
                products.push(this);
                fs.writeFileSync(p, JSON.stringify(products));
                return resolve(true);

            } catch (error) {
                return reject('save product error: ' + error);
            }
        });
    }
    static fetchAll() {
        return new Promise(async(resolve, reject) => {
            try {
                const products = JSON.parse(fs.readFileSync(p, "utf-8"));
                return resolve(products)
            } catch (error) {

                return reject('fetching data error: ' + error);
            }
        });

    }
    static async getByProductId(product_id) {
        return new Promise(async(resolve, reject) => {
            try {
                const product = await Product.fetchAll();

                const foundProduct = product.find((prod) => {
                    return prod.product_id === product_id;
                });

                return resolve(foundProduct);

            } catch (error) {

                return reject('fetching By Id Error:' + error);
            }
        });

    }
};