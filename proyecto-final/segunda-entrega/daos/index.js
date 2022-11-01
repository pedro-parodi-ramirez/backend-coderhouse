let productDAO;
let chartDAO

let PERSISTANCE_TYPE = 'firebase'

switch (PERSISTANCE_TYPE) {
    case 'mongodb':
        const { default: ProductDaoMongoDB } = await import('./products/ProductDaoMongoDB.js');
        const { default: ChartDaoMongoDB } = await import('./charts/ChartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB();
        chartDAO = new ChartDaoMongoDB();
        break;
    case 'firebase':
        const { default: ProductDaoFirebase } = await import('./products/ProductDaoFirebase.js');
        const { default: ChartDaoFirebase } = await import('./charts/ChartDaoFirebase.js');
        productDAO = new ProductDaoFirebase();
        chartDAO = new ChartDaoFirebase();
        break;
    case 'fileSystem':
        const { default: ProductDaoFileSystem } = await import('./products/ProductDaoFileSystem.js');
        const { default: ChartDaoFileSystem } = await import('./charts/ChartDaoFileSystem.js');
        productDAO = new ProductDaoFileSystem('products.json');
        chartDAO = new ChartDaoFileSystem('shoppingCharts.json');
        break;
    case 'memory':
        const { default: ProductDaoMemory } = await import('./products/ProductDaoMemory.js');
        const { default: ChartDaoMemory } = await import('./charts/ChartDaoMemory.js');
        productDAO = new ProductDaoMemory();
        chartDAO = new ChartDaoMemory();
        break;
    default:
        const { default: ProductDaoMongoDB_ } = await import('./products/ProductDaoMongoDB.js');
        const { default: ChartDaoMongoDB_ } = await import('./charts/ChartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB_();
        chartDAO = new ChartDaoMongoDB_();
        break;
}

export { productDAO, chartDAO };