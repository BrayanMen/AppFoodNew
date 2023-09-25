const {Router} = require('express')
const router = Router();
const userRouter = require('./UsersRouter')

router.get("/prueba", (req, res)=>{
       return res.status(200).send('Servidor funcionando...')
});

router.use('/log/users', userRouter)


module.exports = router;