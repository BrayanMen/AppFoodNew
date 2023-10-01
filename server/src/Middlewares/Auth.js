const asyncHandler = require('express-async-handler');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: "1d",
    })
};

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, JWT_SECRET)

            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("No esta Autorizado, Token Invalido")
        }
    }
});

const admin = asyncHandler(async (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401);
        throw new Error('Usuario no Autorizado')
    }

})

module.exports = {
    generateToken,
    protect,
    admin,
};