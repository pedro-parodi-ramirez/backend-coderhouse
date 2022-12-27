let productDAO;
let cartDAO;

switch (process.env.PERSISTANCE_TYPE) {
    case 'mongodb':
        console.log("📂 Data persistance: <MongoDB> 📂");
        const { default: ProductDaoMongoDB } = await import('./products/ProductDaoMongoDB.js');
        const { default: cartDaoMongoDB } = await import('./carts/cartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB();
        cartDAO = new cartDaoMongoDB();
        break;
    case 'firebase':
        console.log("📂 Data persistance: <Firebase> 📂");
        const { default: ProductDaoFirebase } = await import('./products/ProductDaoFirebase.js');
        const { default: cartDaoFirebase } = await import('./carts/cartDaoFirebase.js');
        productDAO = new ProductDaoFirebase();
        cartDAO = new cartDaoFirebase();
        break;
    case 'filesystem':
        console.log("📂 Data persistance: <JSON Files> 📂");
        const { default: ProductDaoFileSystem } = await import('./products/ProductDaoFileSystem.js');
        const { default: cartDaoFileSystem } = await import('./carts/cartDaoFileSystem.js');
        productDAO = new ProductDaoFileSystem('products.json');
        cartDAO = new cartDaoFileSystem('shoppingCarts.json');
        break;
    case 'memory':
        console.log("📂 Data persistance: <Memory> 📂");
        const { default: ProductDaoMemory } = await import('./products/ProductDaoMemory.js');
        const { default: cartDaoMemory } = await import('./carts/cartDaoMemory.js');
        productDAO = new ProductDaoMemory();
        cartDAO = new cartDaoMemory();
        break;
    default:
        console.log("📂 Data persistance <default: Mongo DB> 📂");
        const { default: ProductDaoMongoDB_ } = await import('./products/ProductDaoMongoDB.js');
        const { default: cartDaoMongoDB_ } = await import('./carts/cartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB_();
        cartDAO = new cartDaoMongoDB_();
        break;
}

export { productDAO, cartDAO };