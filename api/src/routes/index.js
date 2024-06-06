var express = require('express');

const indexRouter = express.Router();

indexRouter.get('/',(req,res)=>{
    res.status(200).send({ result: "🏠 Home 🏠" });
})

module.exports = indexRouter;