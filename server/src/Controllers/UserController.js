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
            if(!userExist.isActive){
                userExist.fullName= fullName,
                userExist.password= await bcrypt.hash(password, 10),
                userExist.image= image,
                userExist.isActive = true,
                await userExist.save();
                
                return res.status(200).json({
                    _id: userExist.id,
                    fullName: userExist.fullName,
                    email: userExist.email,
                    image: userExist.image,
                    isAdmin: userExist.isAdmin,
                    token: generateToken(userExist._id),
                })
            }else{
                res.status(400).json({ message: 'El usuario ya está activo' });
            }                
        }

        //Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await User.create({
            fullName,
            email,
            isActive: true,
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

        if (user && user.isActive &&(await bcrypt.compare(password, user.password))) {
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
            throw new Error("Correo o Contraseña Inválidos")
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
            if (email && !isValidEmail(email)) {
                res.status(400);
                throw new Error("Correo Electrónico Inválido");
            }
            //Update Email
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

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

const deleteUserProfile = asyncHandler(async(req, res)=>{
    try {
        const user = User.findById(req.user._id);

        if(user){
            if(user.isAdmin){
                res.status(400);
                throw new Error('No puedes desactivar usuarios administradores')
            } 
            user.isActive = false;
            await user.save();
            res.json({message: 'Usuario desactivado con éxito'})
        }else{
            res.status(404);
            throw new Error('Usuario no encontrado')
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    deleteUserProfile,
};