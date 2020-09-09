const { response } = require("express")

module.exports.home=function(req,res){
    console.log(req.cookies);
    res.cookie('ke',12);
    return res.render('home',{
        title:"home"
    });
}