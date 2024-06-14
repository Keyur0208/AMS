const express = require('express');
const app = express();
const message = require('../../utils/messages.json');
const checkUserIsExits = require('../model/auth.model');
const bcrypt = require('bcrypt');
const userModel = require('../model/user');
let jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const register = async (req, res) => {

    let reqData = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validRoles = ['admin', 'employee', 'intern'];
    const exitsUSer = await checkUserIsExits(reqData.email);

    try {
        // Email Validation

        if (typeof reqData.email === "undefined" || reqData.email === "") {
            return res.status(200).send({ result: message.empty_email });
        }
        else if (!emailRegex.test(reqData.email)) {
            return res.status(400).send({ result: message.valid_email });
        }

        // Check if user already exists

        else if (exitsUSer) {
            return res.status(400).send({ result: message.alerdy_email });
        }

        // First name validation

        else if (typeof reqData.first_name === "undefined" || reqData.first_name === "") {
            return res.status(200).send({ result: message.empty_first_name });
        }

        // Last name validation

        else if (typeof reqData.last_name === "undefined" || reqData.last_name === "") {
            return res.status(200).send({ result: message.empty_last_name });
        }

        // Password validation

        else if (typeof reqData.password === "undefined" || reqData.password === "") {
            return res.status(200).send({ result: message.empty_password });
        }

        // Role validation

        else if (typeof reqData.role === "undefined" || reqData.role === "") {
            return res.status(200).send({ result: message.empty_role });
        }
        else if (!validRoles.includes(reqData.role)) {
            return res.status(200).send({ result: message.valid_role });
        }


        // Hash the password

        else {
            const hashedPassword = await bcrypt.hash(reqData.password, 10);

            // Create new user
            const newUser = new userModel({
                first_name: reqData.first_name,
                last_name: reqData.last_name,
                email: reqData.email,
                password: hashedPassword,
                roles: [reqData.role],
            });

            await newUser.save();

            return res.status(201).send({ newUser, result: message.registration_success });
        }

    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}


const Check_Email = async (req, res) => {

    try {
        const reqData = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const exitsUSer = await checkUserIsExits(reqData.email);

        // Email Validation

        if (typeof reqData.email === "undefined" || reqData.email === "") {
            return res.status(200).send({ result: message.empty_email });
        }
        else if (!emailRegex.test(reqData.email)) {
            return res.status(400).send({ result: message.valid_email });
        }

        if (exitsUSer) {
            return res.status(400).send({ result: message.alerdy_email });
        }
        else {
            return res.status(200).send({ result: "Ok" });
        }
    }
    catch (error) {

        console.error('Error during login:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}


const login = async (req, res) => {

    try {

        const reqData = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const user = await userModel.findOne({ email: reqData.email });

        // Email Validation

        if (typeof reqData.email === "undefined" || reqData.email === "") {
            return res.status(200).send({ result: message.empty_email });
        }
        else if (!emailRegex.test(reqData.email)) {
            return res.status(200).send({ result: message.valid_email });
        }

        // Password validation

        else if (typeof reqData.password === "undefined" || reqData.password === "") {
            return res.status(200).send({ result: message.empty_password });
        }

        // User valid Or NoT 

        if (!user) {
            return res.status(401).send({ result: message.invalid_email });
        }

        // Password Check

        const isPasswordvalid = await bcrypt.compare(req.body.password, user.password);

        if (!isPasswordvalid) {
            return res.status(401).send({ result: message.invalid_password });
        }

        else {
            let data = {
                userId: user._id,
                role: user.roles
            }

            // Jwt Token Generated

            const token = jwt.sign(data, JWT_SECRET);

            res.status(200).send({ result: message.login_success, token });
        }

    }
    catch (error) {

        console.error('Error during login:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}

const userGet = async (req, res) => {
    res.status(200).send({ result: message.getUser, user: req.user });
}

const userSearch = async (req, res) => {
    try {
        const { roles, first_name } = req.query;
        let query = { is_deleted: false };
        if (roles && roles !== 'all') {
            query.roles = roles;
        }
        if (first_name !== undefined && first_name.trim() !== '') {
            query.first_name = new RegExp(first_name, 'i');
        }

        const users = await userModel.find(query, ['first_name', 'last_name', 'roles', 'password', 'id', "email"]);

        res.status(200).json({ result: message.Search_User, users });

    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ result: message.something_went_wrong });
    }
}


const userEdit = async (req, res) => {
    const userId = req.params.id;
    const { role, first_name, last_name, email, password } = req.body;

    try {
        const user = await userModel.findOne({ _id: userId, is_deleted: false });

        if (!user) {
            return res.status(400).send({ result: message.User_not_found });
        }
        if (first_name) {
            user.first_name = first_name;
        }
        if (last_name) {
            user.last_name = last_name;
        }
        if (email) {
            user.email = email;
        }
        if (role) {
            user.roles = [role];
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        user.updated_at = Date.now();
        await user.save();
        res.status(200).send({ result: message.userUpdate, user });

    } catch (error) {
        console.error('Error updating user:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}

const userDelete = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({ result: message.User_not_found });
        }
        user.is_actived = false;
        user.is_deleted = true;
        user.updated_at = Date.now();
        await user.save();
        res.status(200).send({ result: message.userDelete });

    } catch (error) {
        console.error('Error deleting user:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
};

const profileEdit = async (req, res) => {
    try {
        const user = req.user;
        const phoneRegex = /^\d{10}$/;
        const userRole = user.roles[0];

        if (userRole === 'admin') {
            if (req.body.phone) {
                if (!phoneRegex.test(req.body.phone)) {
                    return res.status(400).send({ result: message.invalid_phone });
                }
                user.phone = req.body.phone;
            }
            if (req.body.bio) {
                user.bio = req.body.bio;
            }
            if (req.body.first_name) {
                user.first_name = req.body.first_name;
            }
            if (req.body.last_name) {
                user.last_name = req.body.last_name;
            }
            if (req.body.email) {
                user.email = req.body.email;
            }
            if (req.body.password) {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                user.password = hashedPassword;
            }
        } else if (userRole === 'employee' || userRole === 'intern') {
            if (req.body.phone) {
                if (!phoneRegex.test(req.body.phone)) {
                    return res.status(400).send({ result: message.invalid_phone });
                }
                user.phone = req.body.phone;
            }
            if (req.body.bio) {
                user.bio = req.body.bio;
            }
            if (req.body.first_name || req.body.last_name || req.body.email || req.body.password) {
                return res.status(403).send({ result: message.unauthorized_role });
            }
        } else {
            return res.status(403).send({ result: message.unauthorized_role });
        }

        user.updated_at = Date.now();
        await user.save();

        res.status(200).send({ result: message.profileUpdate, user });

    } catch (error) {
        console.error('Error updating profile:', error);
        return res.status(400).send({ result: message.something_went_wrong });
    }
}

module.exports = { register, login, userGet, userSearch, userEdit, userDelete, profileEdit, Check_Email };
