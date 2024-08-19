const asyncHandler = require('express-async-handler');
const mongoose = require("mongoose");
const User = require('../Models/UserModel');
const Recipe = require('../Models/RecipesModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../Middlewares/Auth');

//Public
const registerUser = asyncHandler(async (req, res) => {
    const { fullName, email, password, image } = req.body;
    try {
        const userExist = await User.findOne({ email })

        if (userExist) {
            if (!userExist.isActive) {
                userExist.fullName = fullName,
                    userExist.password = await bcrypt.hash(password, 10),
                    userExist.image = image,
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
            } else {
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

        if (user && user.isActive && (await bcrypt.compare(password, user.password))) {
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
const updateUserProfile = asyncHandler(async (req, res) => {
    const { fullName, email, image } = req.body;
    try {
        const user = await User.findById(req.user._id);

        if (user) {
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
        } else {
            res.status(404);
            throw new Error("Usuario no Encontrado")
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

const deleteUserProfile = asyncHandler(async (req, res) => {
    try {
        const user = User.findById(req.user._id);

        if (user) {
            if (user.isAdmin) {
                res.status(400);
                throw new Error('No puedes eliminar usuarios administradores')
            }
            user.isActive = false;
            await user.save();
            res.json({ message: 'Usuario eliminado con éxito' })
        } else {
            res.status(404);
            throw new Error('Usuario no encontrado')
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        const user = await User.findById(req.user._id);
        if (user && (bcrypt.compare(oldPassword, user.password))) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            res.status(200).json({ message: 'Contraseña cambiada con éxito' })
        } else {
            res.status(401);
            throw new Error('La contraseña actual es incorrecta');
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

const getLikesRecipes = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate("likedRecipes");
        if (user) {
            res.json(user.likedRecipes);
        } else {
            res.status(404);
            throw new Error('Usuario no Encontrado')
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

const addLikedRecipes = asyncHandler(async (req, res) => {
    const { recipeId } = req.body;
    try {
        if (!recipeId) {
            res.status(400).json({ message: 'RecipeId is required' });
            return;
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        const stringRecipeId = String(recipeId);

        if (user.likedRecipes.includes(stringRecipeId)) {
            res.status(400).json({ message: 'Recipe already liked' });
            return;
        }

        user.likedRecipes.push(stringRecipeId);
        await user.save();

        res.status(200).json(user.likedRecipes);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

const deleteLikerecipes = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if (user) {
            user.likedRecipes = [];
            await user.save();
            res.json('Recetas favoritas eliminadas:');
        } else {
            res.status(404).json('Recetas no encontradas');
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

//ADMIN

const getUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find({});
        if (users) {
            res.status(200).send(users)
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    try {
        const user = User.findById(req.user._id)
        if (user) {
            if (user.isAdmin) {
                res.status(400).send('No puedes eliminar un Usuario Administrador')
            } else {
                await user.remove();
                res.json({ message: 'Usuario eliminado con éxito' })
            }
        } else {
            res.status(404).send('Usuario no encontrado')
        }

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = {
    registerUser,
    loginUser,
    updateUserProfile,
    deleteUserProfile,
    changeUserPassword,
    getLikesRecipes,
    addLikedRecipes,
    deleteLikerecipes,
    getUsers,
    deleteUser,
};