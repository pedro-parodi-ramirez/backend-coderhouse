let productDAO;
let chartDAO

switch (process.env.PERSISTENCE_TYPE) {
    case 'mongodb':
        const { default: ProductDaoMongoDB } = await import('./products/ProductDaoMongoDB.js');
        const { default: ChartDaoMongoDB } = await import('./charts/ChartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB();
        chartDAO = new ChartDaoMongoDB();
        break;
    default:
        const { default: ProductDaoMongoDB_ } = await import('./products/ProductDaoMongoDB.js');
        const { default: ChartDaoMongoDB_ } = await import('./charts/ChartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB_();
        chartDAO = new ChartDaoMongoDB_();
        break;
}

export { productDAO, chartDAO };