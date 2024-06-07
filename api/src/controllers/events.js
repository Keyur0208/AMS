const express = require('express');
const app = express();
const message = require('../../utils/messages.json');
const eventModel = require('../model/events');
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const ejs = require('ejs');

const created_event = async (req, res) => {
    const reqData = req.body;
    try {
        // Evnet Date Validation

        if (typeof reqData.event_date === "undefined" || reqData.event_date === "") {
            return res.status(200).send({ result: message.empty_event_date });
        }

        // Event Name Validation

        else if (typeof reqData.event_name === "undefined" || reqData.event_name === "") {
            return res.status(200).send({ result: message.empty_event_name });
        }

        // Event Des Validation

        else if (typeof reqData.event_des === "undefined" || reqData.event_des === "") {
            return res.status(200).send({ result: message.empty_event_des });
        }
        else {
            // Crrated New Event
            const newEvent = eventModel({
                event_date: reqData.event_date,
                event_name: reqData.event_name,
                event_des: reqData.event_des,
                userId: req.user._id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                roles: req.user.roles,
            });
            await newEvent.save();
            return res.status(201).send({ newEvent, result: message.event_success });
        }
    }
    catch (error) {
        console.error('Error during created event:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}

const getall_event = async (req, res) => {

    try {
        const event = await eventModel.find({ is_deleted: false });
        return res.status(200).send({ result: message.display_Event, event });
    }
    catch (error) {
        console.error('Error updating user:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}

const edit_event = async (req, res) => {

    const eventId = req.params.id;

    const { event_date, event_name, event_des } = req.body;

    try {
        const event = await eventModel.findOne({ _id: eventId, is_deleted: false });

        if (!event) {
            return res.status(400).send({ result: message.event_not_found });
        }
        if (event_date) {
            event.event_date = event_date;
        }
        if (event_name) {
            event.event_name = event_name;
        }
        if (event_des) {
            event.event_des = event_des;
        }
        event.updated_at = Date.now();
        await event.save();
        res.status(200).send({ result: message.userUpdate, event });
    }
    catch (error) {
        console.error('Error updating event:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}

const delete_event = async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.status(404).send({ result: message.event_not_found });
        }
        event.is_actived = false;
        event.is_deleted = true;
        event.updated_at = Date.now();
        await event.save();
        res.status(200).send({ result: message.eventDeletd });
    }
    catch (error) {
        console.error('Error deleting event:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}

// const pdf_event = async (req, res) => {
//     const eventId = req.params.id;

//     try {
//         const event = await eventModel.findById(eventId);
//         if (!event) {
//             return res.status(404).send({ result: message.event_not_found });
//         }

//         const doc = new PDFDocument({ size: 'A4', margin: 50 });

//         // Set the response headers to indicate a PDF file
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename="event-${event._id}.pdf"`);

//         // Pipe the PDF document directly to the response
//         doc.pipe(res);

//         doc.rect(0, 0, doc.page.width, doc.page.height).fill('white');

//         doc.fill('black').stroke();

//         doc.font('Helvetica')
//             .fontSize(40)
//             .fillColor('black')
//             .font('Helvetica-Bold')
//             .text(`${event.event_name}`, { align: 'center' });

//         doc.moveDown();

//         doc.font('Helvetica')
//             .fontSize(12)
//             .fillColor('black')
//             .font('Helvetica-Bold')
//             .text(`Date: ${event.event_date}`, { align: 'right' });

//         doc.moveDown();

//         doc.font('Helvetica')
//             .fontSize(12)
//             .fillColor('black')
//             .font('Helvetica-Bold')
//             .text(`${event.event_des}`, { align: 'left' });

//         doc.moveDown();

//         doc.font('Helvetica')
//             .fontSize(18)
//             .fillColor('black')
//             .text(`Organizer: `, { continued: true })
//             .font('Helvetica-Bold')
//             .text(`${event.first_name} ${event.last_name}`, { align: 'left' });

//         doc.moveDown();

//         // Finalize the PDF and end the stream
//         doc.end();
//     }
//     catch (error) {
//         console.error('Error deleting event:', error);
//         return res.status(400).send({ result: message.something_went_wrong });
//     }
// }

const pdf_event = async (req, res) => {
    const eventId = req.params.id;
    try {
        const event = await eventModel.findById(eventId);
        if (!event) {
            return res.status(404).send({ result: message.event_not_found });
        }

        const templatePath = path.join(__dirname, '../../views/EventTemplate.ejs');
        const template = fs.readFileSync(templatePath, 'utf8');

        const html = ejs.render(template, event);
        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
        const page = await browser.newPage();

        await page.setContent(html, { waitUntil: 'networkidle0' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            timeout: 60000
        });

        await browser.close();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename=leaveDetails.pdf',
            'Content-Length': pdfBuffer.length
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error("Error generating PDF:", error);
        res.status(500).send({ result: 'Error generating PDF' });
    }
};



module.exports = { created_event, edit_event, delete_event, getall_event, pdf_event };