let jwt = require('jsonwebtoken');
const userModel = require('../model/user');
let message = require('../../utils/messages.json')


const AuthMiddleware = async(req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ result: message.no_token_provided });
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const user = await userModel.findById(decoded.userId);

        if (!user) {
            return res.status(404).send({ result: message.user_not_found });
        }
        req.user = user;
        next(); 

    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).send({ result: message.invalid_token });
    }
}

module.exports = AuthMiddleware;