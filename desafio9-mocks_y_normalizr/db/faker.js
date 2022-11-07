import { faker } from '@faker-js/faker';

class dbFaker {
    static async getProduct() {
        const product = {
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            thumbnail: faker.internet.avatar()
        }
        return product;
    }

    static async getView() {
        const products = [];
        for (let i = 0; i < 5; i++) {
            products.push(await this.getProduct());
        }
        return products;
    }
}

export default dbFaker;