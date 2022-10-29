let productDAO;

switch (process.env.PERSISTENCE_TYPE) {
    case 'mongodb':
        const { default: ProductDaoMongoDB } = await import('./products/ProductDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB();
        break;
    default:
        const { default: ProductDaoMongoDB_ } = await import('./products/ProductDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB_();
        break;
}

export { productDAO };