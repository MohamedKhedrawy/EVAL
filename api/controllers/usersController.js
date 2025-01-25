import User from "../models/usersModel.js";
import asyncHandler from "express-async-handler";
import { verifyPassword, hashPassword } from "../utils/passwordAuth.js";
import {generateToken} from '../utils/jwtAuth.js'
import { validationResult } from "express-validator";

export const registerUser = asyncHandler( async(req, res) => {
    const {name, email, password, confirmPassword} = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
    }

    if (!name || !email || !password || !confirmPassword) {
        res.status(400);
        throw new Error('Add all fields');
    }

    const existingUser = await User.findOne({email});

    if (existingUser) {
        res.status(400);
        throw new Error('User Already Exists');
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
    })

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        })
    } else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

export const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const existingUser = await User.findOne({email});

    if (existingUser) {
        const isAuthed = await verifyPassword(existingUser.password, password);

        if (isAuthed) {
            res.status(200).json({
                _id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                isAuthed: true,
                token: generateToken(existingUser._id)
            })
        } else {
            res.status(400);
            throw new Error('Wrong Password');
        }
    } else {
        res.status(400);
        throw new Error('User Does Not Exist')
    }
})


export const getMyInfo = asyncHandler(async (req, res) => {
    const {_id, name, email, token} = await User.findById(req.user._id)
    
    res.status(200).json({
        _id: _id,
        name,
        email
    })
})