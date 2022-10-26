export default class Product {
    constructor(product){
        this.id = product.id,
        this.timestamp = product.timestamp,
        this.name = product.name,
        this.description = product.description,
        this.code = product.code,
        this.image = product.image,
        this.price = product.price,
        this.stock = product.stock
    }
};