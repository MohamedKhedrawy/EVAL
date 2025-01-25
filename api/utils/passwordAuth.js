import argon2id from "argon2"
import asyncHandler from "express-async-handler"

export const hashPassword = asyncHandler(async (password) => {
    const hashedPassword = await argon2id.hash(password);
    return hashedPassword;
})

export const verifyPassword = asyncHandler( async(hashedPassword, inputPassword) => {
    return await argon2id.verify(hashedPassword, inputPassword);
})