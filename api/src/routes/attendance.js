const express = require('express');
const controller = require('../controllers/attendance');
const AuthMiddleware = require('../middleware/authmiddleware');
const AdminMiddleware = require('../middleware/adminmiddleware');

const attendanceRouter = express.Router();

attendanceRouter.post('/created',AuthMiddleware,controller.create_attendance); // only employee and intern create attendace

attendanceRouter.get('/admin/dailyDate/search',AdminMiddleware,controller.dailyDate_attendance_search ); // Only Show Admin Not employee or intern

attendanceRouter.get('/admin/month/search',AdminMiddleware,controller.month_attendance_search) // Only Show Admin Not employee or intern 

attendanceRouter.get('/month/search',controller.search_attendance_by_name_and_date) // Only Show Admin Not employee or intern 

module.exports = attendanceRouter;