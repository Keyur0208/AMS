const express = require("express");
const controller = require('../controllers/leaves');
const AuthMiddleware = require("../middleware/authmiddleware");

const leaveRouter = express.Router();

leaveRouter.post('/created', AuthMiddleware , controller.created_leave);

leaveRouter.get('/search',controller.getAll_leave); // search first_name , last_name , roles by admin

leaveRouter.get('/get',AuthMiddleware,controller.get_userid); // self usershow how many leave 

leaveRouter.put('/get/edit/:id',AuthMiddleware,controller.edit_leave); // self user edit leave

leaveRouter.get('/get/pdf/:id',AuthMiddleware,controller.pdf_leave) // Genrator PDf

module.exports = leaveRouter;
