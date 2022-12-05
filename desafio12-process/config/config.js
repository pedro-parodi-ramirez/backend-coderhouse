import yargs from 'yargs/yargs';

const params = yargs(
    process.argv.slice(2)
)
    .default({
        p: 8080
    })
    .alias({
        p: 'port'
    })
    .argv

const config = {
    PORT: params.port,
    MONGO_URI: process.env.MONGO_URI,
    databaseSQL: {
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
}

export default config;