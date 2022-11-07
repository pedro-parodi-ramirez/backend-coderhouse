const database = {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: "./db/ecommerce.sqlite"
        }
    },
    sql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: '',
            database: 'ecommerce_products'
        }
    }
}

export default database;