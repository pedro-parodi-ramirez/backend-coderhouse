console.log("📂 Data persistance: <MongoDB> 📂");
const { default: ProductDaoMongoDB } = await import('./ProductDaoMongoDB.js');
const { default: CartDaoMongoDB } = await import('./CartDaoMongoDB.js');
const { default: UserDaoMongoDB } = await import('./UserDaoMongoDB.js');
const productDAO = new ProductDaoMongoDB();
const cartDAO = new CartDaoMongoDB();
const userDAO = new UserDaoMongoDB();

export { productDAO, cartDAO, userDAO };