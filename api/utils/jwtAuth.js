import jwt from 'jsonwebtoken';
import jwtInfo from "../config/jwt.js";

export const generateToken = (id) => {
    return jwt.sign({id}, jwtInfo.secret, {expiresIn: jwtInfo.expiresIn})
}