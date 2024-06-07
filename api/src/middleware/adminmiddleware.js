const jwt = require('jsonwebtoken');
const message = require('../../utils/messages.json');
const userModel = require('../model/user');

const auth = async (req, res, next) => {
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;

    if (!token) {
        return res.status(401).json({ result: message.no_token_provided });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ result:message.user_not_found });
        }
        else if (user.roles != "admin") {
            return res.status(401).json({ result:message.admin_craeted_event });
        }
        else {
            req.user = user;
            next();
        }

    } catch (error) {
        res.status(401).json({ result:message.invalid_token });
    }
};

module.exports = auth;
