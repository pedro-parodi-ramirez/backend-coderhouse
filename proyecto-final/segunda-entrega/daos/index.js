let productDAO;
let chartDAO

switch (process.env.PERSISTANCE_TYPE) {
    case 'mongodb':
        const { default: ProductDaoMongoDB } = await import('./products/ProductDaoMongoDB.js');
        const { default: ChartDaoMongoDB } = await import('./charts/ChartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB();
        chartDAO = new ChartDaoMongoDB();
        break;
    case 'fileSystem':
        const { default: ProductDaoFileSystem } = await import('./products/ProductDaoFileSystem.js');
        const { default: ChartDaoFileSystem } = await import('./charts/ChartDaoFileSystem.js');
        productDAO = new ProductDaoFileSystem('products.json');
        chartDAO = new ChartDaoFileSystem('shoppingCharts.json');
        break;
    default:
        const { default: ProductDaoMongoDB_ } = await import('./products/ProductDaoMongoDB.js');
        const { default: ChartDaoMongoDB_ } = await import('./charts/ChartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB_();
        chartDAO = new ChartDaoMongoDB_();
        break;
}

export { productDAO, chartDAO };