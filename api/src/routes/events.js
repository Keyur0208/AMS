const express = require("express");
const controller = require("../controllers/events");
const adminmiddleware = require("../middleware/adminmiddleware");

const eventRouter = express.Router();

eventRouter.post('/create',adminmiddleware ,controller.created_event); // Event Craeted by Only Admin

eventRouter.get('/getAll',controller.getall_event) // Display All Event Date Wise

eventRouter.put('/edit/:id',adminmiddleware ,controller.edit_event); // Event Edit by Only Admin

eventRouter.delete('/delete/:id',adminmiddleware ,controller.delete_event); // Event Delete by Only Admin

eventRouter.get('/:id/pdf',controller.pdf_event); // Dowlond Event Pdf 

module.exports = eventRouter;