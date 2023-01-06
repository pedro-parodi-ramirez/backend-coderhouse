console.log("📂 Data persistance: <MongoDB> 📂");
const { default: ProductDaoMongoDB } = await import('./ProductDaoMongoDB.js');
const { default: cartDaoMongoDB } = await import('./CartDaoMongoDB.js');
const productDAO = new ProductDaoMongoDB();
const cartDAO = new cartDaoMongoDB();

export { productDAO, cartDAO };