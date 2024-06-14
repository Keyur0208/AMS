const express = require('express');
const app = express();
const message = require('../../utils/messages.json');
const AttendanceModel = require('../model/attendance');
const ReportModel = require('../model/report');

function calculateTimeDifference(startTime, stopTime) {
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [stopHours, stopMinutes] = stopTime.split(':').map(Number);

    const startTotalMinutes = startHours * 60 + startMinutes;
    const stopTotalMinutes = stopHours * 60 + stopMinutes;

    let differenceInMinutes = stopTotalMinutes - startTotalMinutes;

    if (differenceInMinutes < 0) {
        differenceInMinutes += 24 * 60;
    }

    const hours = Math.floor(differenceInMinutes / 60);
    const minutes = differenceInMinutes % 60;

    return { hours, minutes };
}

function getCurrentDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    let yyyy = today.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
}

const create_attendance = async (req, res) => {
    const reqData = req.body;
    const timeFormat = /^(0[1-9]|1\d|2[0-3]):([0-5]\d)|24:00$/;

    try {

        // Firts Condition Check Check_in time empty

        if (!reqData.check_in || reqData.check_in === "") {
            return res.status(200).send({ result: message.empty_check_in });
        }

        // Second Condition Check Check_in time validation

        else if (!timeFormat.test(reqData.check_in)) {
            return res.status(200).send({ result: message.valid_check_in });
        }

        // Third Condition Check Check_out time empty

        else if (!reqData.check_out || reqData.check_out === "") {
            return res.status(200).send({ result: message.empty_check_out });
        }

        // Fourth Condition Check Check_out time validation

        else if (!timeFormat.test(reqData.check_out)) {
            return res.status(200).send({ result: message.valid_check_out });
        }

        // Fifth Condtion Check Break_start time validation but not requirement Break_start

        else if (reqData.break_on && !timeFormat.test(reqData.break_on)) {
            return res.status(200).send({ result: message.valid_break_start });
        }

        // Six Condtion Check Break_end time validation not requirement Break_end

        else if (reqData.break_end && !timeFormat.test(reqData.break_end)) {
            return res.status(200).send({ result: message.valid_break_out });
        }

        // All Done

        else {
            const totalWork = calculateTimeDifference(reqData.check_in, reqData.check_out);
            const totalBreak = reqData.break_on && reqData.break_end ? calculateTimeDifference(reqData.break_on, reqData.break_end) : { hours: 0, minutes: 0 };
            const CurrentDate = getCurrentDate();
            const existingAttendance = await AttendanceModel.findOne({ userId: req.user._id, date: CurrentDate });

            // Check User user_id extis and same date 

            if (!existingAttendance) {

                let saveData = false;

                // Roles Employee must be work 6 hours

                if (req.user.roles == 'employee' && totalWork.hours >= 6) {
                    saveData = true;
                }

                // Roles intern must be work 4 hours

                else if (req.user.roles == 'intern' && totalWork.hours >= 4) {
                    saveData = true;
                }

                // saveDate = true than save data in the model

                if (saveData) {
                    const newAttendance = new AttendanceModel({
                        date: CurrentDate,
                        check_in: reqData.check_in,
                        check_out: reqData.check_out,
                        break_on: reqData.break_on,
                        break_end: reqData.break_end,
                        total_work: `${totalWork.hours}:${totalWork.minutes.toString().padStart(2, '0')}`,
                        total_break: `${totalBreak.hours}:${totalBreak.minutes.toString().padStart(2, '0')}`,
                        userId: req.user._id,
                        first_name: req.user.first_name,
                        last_name: req.user.last_name,
                        roles: req.user.roles,
                    });

                    const savedAttendance = await newAttendance.save();

                    // Data Save in Report Model <=

                    const reportUpdate = await ReportModel.findOneAndUpdate(
                        { report_date: CurrentDate },
                        {
                            $push: {
                                report_record: {
                                    first_name: req.user.first_name,
                                    last_name: req.user.last_name,
                                    attendance_Id: savedAttendance._id,
                                    result: 'P',
                                    roles: req.user.roles
                                },
                            },
                        },
                        { upsert: true, new: true, setDefaultsOnInsert: true }
                    );

                    res.status(201).send({ result: message.attdance_craeted, savedAttendance, reportUpdate });

                }

                // not 4 or 6 hours error gernator

                else {
                    res.status(400).send({ result: `Total work ${totalWork.hours} do not meet the requirements for the ${req.user.roles} role` });
                }
            }
            else {
                res.status(400).send({ error: "Attendance already exists for this user on the current date" });
            }
        }

    } catch (error) {
        console.error('Error creating attendance:', error);
        res.status(500).send({ result: "An error occurred while creating the attendance record." });
    }
};


const dailyDate_attendance_search = async (req, res) => {

    const { roles, date } = req.query;

    if (!roles || !date) {
        return res.status(400).send({ error: "Roles and date are required query parameters" });
    }

    try {
        const reports = await ReportModel.find({ report_date: date });

        let presentCount = 0;
        let absentCount = 0;
        let totalCount = 0;
        let  analysis;

        reports.forEach(report => {
            report.report_record.forEach(record => {
                if (record.roles.includes(roles)) {
                    totalCount++;
                    if (record.result === 'P') {
                        presentCount++;
                    }
                    if(record.result == 'A'){
                        absentCount++;
                    }
                }
            });
            analysis = `${presentCount/totalCount*100}%`;
        });

        res.status(200).send({ presentCount,absentCount,totalCount , analysis});
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).send({ error: "An error occurred while fetching the report" });
    }

}

const monthNames = {
    jan: '01',
    feb: '02',
    mar: '03',
    apr: '04',
    may: '05',
    jun: '06',
    jul: '07',
    aug: '08',
    sep: '09',
    oct: '10',
    nov: '11',
    dec: '12'
};

const month_attendance_search = async (req, res) => {
    const { roles, date, name } = req.query;

    if (!roles || !date) {
        return res.status(400).send({ error: "Roles and date are required query parameters" });
    }

    const [monthName, year] = date.split('/');
    const month = monthNames[monthName.toLowerCase()];

    if (!month || !year) {
        return res.status(400).send({ error: "Invalid date format" });
    }

    try {
        const reports = await ReportModel.find({
            report_date: {
                $regex: new RegExp(`^\\d{2}/${month}/${year}$`)
            }
        });

        console.log(`Reports found: ${reports.length}`);

        let results = [];

        reports.forEach(report => {
            report.report_record.forEach(record => {
                if (record.roles.includes(roles)) {
                    const fullName = `${record.first_name} ${record.last_name}`;
                    if (!name || fullName.toLowerCase().includes(name.toLowerCase())) {
                        results.push({
                            date: report.report_date,
                            name: fullName,
                            result: record.result
                        });
                    }
                }
            });
        });

        let groupedResults = results.reduce((acc, item) => {
            let existing = acc.find(result => result.name === item.name);
            if (!existing) {
                existing = { name: item.name, present: 0, absent: 0, attendance: {} };
                acc.push(existing);
            }
            existing.attendance[item.date] = item.result;
            if (item.result === 'P') {
                existing.present++;
            } else if (item.result === 'A') {
                existing.absent++;
            }
            return acc;
        }, []);

        console.log(`Grouped results: ${JSON.stringify(groupedResults, null, 2)}`);

        res.status(200).send({ results: groupedResults });
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).send({ error: "An error occurred while fetching the report" });
    }
};

const search_attendance_by_name_and_date = async (req, res) => {
    const { name, date } = req.query;

    if (!name || !date) {
        return res.status(400).send({ error: "Name and date are required query parameters" });
    }

    const [monthName, year] = date.split('/');
    const month = monthNames[monthName.toLowerCase()];

    if (!month || !year) {
        return res.status(400).send({ error: "Invalid date format" });
    }

    try {
        const reports = await ReportModel.find({
            report_date: {
                $regex: new RegExp(`^\\d{2}/${month}/${year}$`)
            }
        });

        let results = {};
        
        reports.forEach(report => {
            report.report_record.forEach(record => {
                const fullName = `${record.first_name} ${record.last_name}`;
                if (fullName.toLowerCase().includes(name.toLowerCase())) {
                    if (!results[fullName]) {
                        results[fullName] = { present: 0, absent: 0, records: [] };
                    }
                    if (record.result === 'P') {
                        results[fullName].present++;
                    } else if (record.result === 'A') {
                        results[fullName].absent++;
                    }
                }
            });
        });

        const formattedResults = Object.keys(results).map(name => ({
            name,
            present: results[name].present,
            absent: results[name].absent,
        }));

        res.status(200).send({ results: formattedResults });
    } catch (error) {
        console.error('Error fetching report:', error);
        res.status(500).send({ error: "An error occurred while fetching the report" });
    }
};

module.exports = { create_attendance, dailyDate_attendance_search,month_attendance_search,search_attendance_by_name_and_date }