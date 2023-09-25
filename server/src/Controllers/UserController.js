const asyncHandler = require('express-async-handler');
const User = require('../Models/UserModel');
const bcrypt = require('bcryptjs');
const {generateToken} = require('../Middlewares/Auth');

//Public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        const userExist = await User.findOne({ email })

        if (userExist) {
            throw new Error('Usuario Existente')
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            image,
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(400);
            throw new Error("Usuario Invalido")
        }

    } catch (error) {
        res.status(400).send({ message: error.message })
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user.id,
                fullName: user.fullName,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id),
            });
        } else {
            res.status(401)
            throw new Error("Correo o Contraseña Invalido")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Private
const updateUserProfile = asyncHandler(async (req, res) =>{
    const {fullName, email, image} = req.body;
    try {
        const user = await User.findById(req.user._id);
        if(user){
            user.fullName = fullName || user.fullName;
            user.email = email || user.email;
            user.image = image || user.image;

            const updateUser = await user.save()
            res.json({
                _id: updateUser.id,
                fullName: updateUser.fullName,
                email: updateUser.email,
                image: updateUser.image,
                isAdmin: updateUser.isAdmin,
                token: generateToken(updateUser._id),
            });
        }else{
            res.status(404);
            throw new Error("Usuario no Encontrado")
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}); 

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
};