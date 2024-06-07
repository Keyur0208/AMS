const express = require('express');
const message = require('../../utils/messages.json');
const leaveModel = require('../model/leaves');
const app = express();
const path = require('path');
const fs = require('fs');
const puppeteer = require('puppeteer');
const ejs = require('ejs');

const created_leave = async (req, res) => {
    const reqData = req.body;
    try {
        if (typeof reqData.leave_date === "undefined" || reqData.leave_date === "") {
            return res.status(200).send({ result: message.empty_leave_Date });
        }
        else if (typeof reqData.reason_name === "undefined" || reqData.reason_name === "") {
            return res.status(200).send({ result: message.reason_name });
        }
        else if (typeof reqData.reason_des === "undefined" || reqData.reason_des === "") {
            return res.status(200).send({ result: message.reason_des });
        }
        else {
            const newLeave = new leaveModel({
                leave_date: reqData.leave_date,
                reason_name: reqData.reason_name,
                reason_des: reqData.reason_des,
                userId: req.user._id,
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                roles: req.user.roles,
            });
            await newLeave.save();
            return res.status(201).send({ result: message.leave_created, newLeave })
        }
    }
    catch (error) {
        console.log("error during create leave", error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}

const getAll_leave = async (req, res) => {

    try {
        const { roles, first_name, last_name } = req.query;
        let query = { is_deleted: false };
        if (roles) {
            query.roles = roles;
        }
        if (first_name) {
            query.first_name = new RegExp(first_name, 'i');
        }
        if (last_name) {
            query.last_name = new RegExp(last_name, 'i');
        }

        const leaves = await leaveModel.find(query);

        res.status(200).json({ result: message.Search_User, leaves });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ result: message.something_went_wrong });
    }
}

const get_userid = async (req, res) => {
    let id = req.user._id;
    try {
        const data = await leaveModel.find({ userId: id, is_deleted: false });
        res.status(200).json({ result: message.Search_User, data });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ result: message.something_went_wrong });
    }
}

const edit_leave = async (req, res) => {

    const leaveId = req.params.id;
    const userid = req.user._id;

    const { leave_date, reason_name, reason_des } = req.body;

    try {
        const leave = await leaveModel.findOne({ userId: userid, _id: leaveId });
        if (!leave) {
            return res.status(400).send({ result: message.leave_not_found });
        }
        if (leave_date) {
            leave.leave_date = leave_date;
        }
        if (reason_name) {
            leave.reason_name = reason_name;
        }
        if (reason_des) {
            leave.reason_des = reason_des;
        }
        leave.update_at = Date.now();
        await leave.save();
        res.status(200).send({ result: message.leave_update, leave });
    }
    catch (error) {
        console.error('Error Editing Leave:', error);
        res.status(500).json({ result: message.something_went_wrong });
    }

}

// const pdf_leave = async (req, res) => {

//     const leaveId = req.params.id;
//     const userid = req.user._id;

//     try {
//         const leave = await leaveModel.findOne({ _id: leaveId, userId: userid });

//         if (!leave) {
//             return res.status(404).send({ result: message.leave_not_found });
//         }

//         const doc = new PDFDocument({ size: 'A4', margin: 50 });

//         // Set the response headers to indicate a PDF file
//         res.setHeader('Content-Type', 'application/pdf');
//         res.setHeader('Content-Disposition', `attachment; filename="event-${leave._id}.pdf"`);

//         // Pipe the PDF document directly to the response
//         doc.pipe(res);
//         doc.image('./public/images/event_background.jpg', 0, 0, { width: doc.page.width, height: doc.page.height })

//         doc.fill('black').stroke();

//         doc.font('Helvetica')
//             .fontSize(40)
//             .fillColor('white')
//             .font('Helvetica-Bold')
//             .text(`${leave.reason_name}`, { align: 'center' });

//         doc.moveDown();

//         doc.font('Helvetica')
//             .fontSize(12)
//             .fillColor('white')
//             .font('Helvetica-Bold')
//             .text(`Date: ${leave.leave_date}`, { align: 'right' });

//         doc.moveDown();

//         doc.font('Helvetica')
//             .fontSize(12)
//             .fillColor('white')
//             .font('Helvetica-Bold')
//             .text(`${leave.reason_des}`, { align: 'left' });

//         doc.moveDown();

//         doc.font('Helvetica')
//             .fontSize(18)
//             .fillColor('white')
//             .font('Helvetica-Bold')
//             .text(`${leave.first_name} ${leave.last_name}`, { align: 'left' });

//         doc.moveDown();

//         // Finalize the PDF and end the stream
//         doc.end();
//     }
//     catch (error) {
//         console.error('Error Editing Leave:', error);
//         res.status(500).json({ result: message.something_went_wrong });
//     }
// }


const pdf_leave = async (req, res) => {
    try {
        const leaveId = req.params.id;
        const leaveData = await leaveModel.findById(leaveId).lean();

        if (!leaveData) {
            return res.status(404).send({ result: 'Leave not found' });
        }

        const templatePath = path.join(__dirname, '../../views/leaveTemplate.ejs');
        const template = fs.readFileSync(templatePath, 'utf8');

        const html = ejs.render(template, leaveData);
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

module.exports = { created_leave, getAll_leave, get_userid, edit_leave, pdf_leave };