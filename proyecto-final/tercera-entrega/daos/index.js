let productDAO;
let cartDAO;

switch (process.env.PERSISTANCE_TYPE) {
    case 'mongodb':
        console.log("📂 Data persistance: <MongoDB> 📂");
        const { default: ProductDaoMongoDB } = await import('./ProductDaoMongoDB.js');
        const { default: cartDaoMongoDB } = await import('./CartDaoMongoDB.js');
        productDAO = new ProductDaoMongoDB();
        cartDAO = new cartDaoMongoDB();
        break;
    case 'filesystem':
        console.log("📂 Data persistance: <JSON Files> 📂");
        const { default: ProductDaoFileSystem } = await import('./ProductDaoFileSystem.js');
        const { default: CartDaoFileSystem } = await import('./CartDaoFileSystem.js');
        productDAO = new ProductDaoFileSystem('products.json');
        cartDAO = new CartDaoFileSystem('shoppingCarts.json');
        break;
    default:
        console.log("📂 Data persistance: <default: JSON Files> 📂");
        const { default: _ProductDaoFileSystem } = await import('./ProductDaoFileSystem.js');
        const { default: _CartDaoFileSystem } = await import('./CartDaoFileSystem.js');
        productDAO = new _ProductDaoFileSystem('products.json');
        cartDAO = new _CartDaoFileSystem('shoppingCarts.json');
        break;
        break;
}

export { productDAO, cartDAO };