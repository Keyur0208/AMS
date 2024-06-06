var express = require('express'); 
const controller = require('../controllers/user');
const AuthMiddleware = require('../middleware/authmiddleware');

const userRouter = express.Router();

userRouter.post('/register',controller.register);

userRouter.post('/login',controller.login);

userRouter.get('/get',AuthMiddleware,controller.userGet);

userRouter.get('/get/all',controller.userGetAll);

userRouter.put('/get/edit/:id',controller.userEdit);

userRouter.delete('/get/delete/:id',controller.userDelete);

userRouter.put('/profile/edit',AuthMiddleware,controller.profileEdit);

// userRouter.put('/admind/profile/edit',AuthMiddleware,controller.profileEdit);

module.exports = userRouter;
