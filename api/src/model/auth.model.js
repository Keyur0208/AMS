const userModel = require('../model/user');

const checkUserIsExits = async(email)=>{
    try
    {
        const result = await userModel.findOne({email,is_deleted:false});
        return result;
    }
    catch (error)
    {
        return null;
    }
}

module.exports = checkUserIsExits;
