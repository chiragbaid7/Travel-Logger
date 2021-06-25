const router = require("express").Router();
router.get("/",async(req,res,next)=>{
    res.status(200).clearCookie('token');
    res.end();
})
module.exports=router