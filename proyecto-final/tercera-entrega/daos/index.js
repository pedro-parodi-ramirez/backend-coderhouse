let productDAO;
let chartDAO;

switch (process.env.PERSISTANCE_TYPE) {
    case 'mongodb':
        console.log("📂 Persistencia de datos en MongoDB 📂");
        const { default: ProductDaoMongoDB } = await import('./products/ProductDaoMongoDB.js');
        const { default: ChartDaoMongoDB } = await import('./charts/ChartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB();
        chartDAO = new ChartDaoMongoDB();
        break;
    case 'firebase':
        console.log("📂 Persistencia de datos en Firebase 📂");
        const { default: ProductDaoFirebase } = await import('./products/ProductDaoFirebase.js');
        const { default: ChartDaoFirebase } = await import('./charts/ChartDaoFirebase.js');
        productDAO = new ProductDaoFirebase();
        chartDAO = new ChartDaoFirebase();
        break;
    case 'filesystem':
        console.log("📂 Persistencia de datos en archivos 📂");
        const { default: ProductDaoFileSystem } = await import('./products/ProductDaoFileSystem.js');
        const { default: ChartDaoFileSystem } = await import('./charts/ChartDaoFileSystem.js');
        productDAO = new ProductDaoFileSystem('products.json');
        chartDAO = new ChartDaoFileSystem('shoppingCharts.json');
        break;
    case 'memory':
        console.log("📂 Persistencia de datos en memoria 📂");
        const { default: ProductDaoMemory } = await import('./products/ProductDaoMemory.js');
        const { default: ChartDaoMemory } = await import('./charts/ChartDaoMemory.js');
        productDAO = new ProductDaoMemory();
        chartDAO = new ChartDaoMemory();
        break;
    default:
        console.log("📂 Persistencia de datos <default: Mongo DB> 📂");
        const { default: ProductDaoMongoDB_ } = await import('./products/ProductDaoMongoDB.js');
        const { default: ChartDaoMongoDB_ } = await import('./charts/ChartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB_();
        chartDAO = new ChartDaoMongoDB_();
        break;
}

export { productDAO, chartDAO };