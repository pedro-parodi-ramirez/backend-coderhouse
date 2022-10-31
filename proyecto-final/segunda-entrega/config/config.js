import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};
const PASSWORD = '3BDOYzW6BNOwzvI1';
const variables = {
    ADMIN: true,
    STATUS: STATUS
}
const config = {
    mongoDB: {
        URI: `mongodb+srv://pedropr:${PASSWORD}@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority`
    },
    fileSystem: {
        path: path.join(__dirname, '/DB')
    }
}



export { variables, config }