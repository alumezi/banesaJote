import dotenv from 'dotenv';
dotenv.config();
const { PORT } = process.env;
let { DB_URL } = process.env;
if (process.env.NODE_ENV === 'test') {
    DB_URL = process.env.TEST_MONGODB_URI;
}
export default {
    DB_URL,
    PORT,
};
