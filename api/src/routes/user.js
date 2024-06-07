const express = require('express'); 
const controller = require('../controllers/user');
const AuthMiddleware = require('../middleware/authmiddleware');

const userRouter = express.Router();

userRouter.post('/register',controller.register); // craeted By Admin 

userRouter.post('/login',controller.login); // Login By Admin,Employee and Intern

userRouter.get('/get',AuthMiddleware,controller.userGet); // Jwt Token Generated To User get

userRouter.get('/get/search',controller.userSearch);  // Search Api Like Role = "ROle_Name" & First_name = "First_name"

userRouter.put('/get/edit/:id',controller.userEdit);  // Only Admin Edit

userRouter.delete('/get/delete/:id',controller.userDelete); // Only Admin Delete

userRouter.put('/profile/edit',AuthMiddleware,controller.profileEdit); // Admin,Employee And intern Profile Edit

module.exports = userRouter;
