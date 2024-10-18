import 'dotenv/config';

const jwtInfo = {
    secret: process.env.JWT_SECRET,
    expiresIn: '7d',
}
export default jwtInfo;