const database = {
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: "./db/sqlite3/ecommerce.sqlite"
        }
    },
    sql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            port: 3307,
            user: 'root',
            password: '',
            database: 'ecommerce_products'
        }
    }
}

module.exports = database;