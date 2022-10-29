const STATUS = {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};
const ADMIN = true;
const PASSWORD = '3BDOYzW6BNOwzvI1';
const URI = `mongodb+srv://pedropr:${PASSWORD}@coderhouse.wm4ogqy.mongodb.net/?retryWrites=true&w=majority`;

export { STATUS, ADMIN, URI };