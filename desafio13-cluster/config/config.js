import yargs from 'yargs/yargs';

const argv = yargs(
    process.argv.slice(2)
)
    .default({
        p: 8080,
        m: 'fork'
    })
    .alias({
        p: 'port',
        m: 'mode'
    })
    .argv

const config = {
    argv,
    PORT: argv.port,
    MONGO_URI: process.env.MONGO_URI
}

export default config;