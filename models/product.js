const fs = require("fs");
const path = require("path");
let p = path.join(__dirname, "../data/data.json");

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
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
};