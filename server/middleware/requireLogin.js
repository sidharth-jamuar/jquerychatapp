const requireLogin=(req,res,next)=>{
if(!req.session.userId){
res.redirect("/login")
}else{
next()
}
}
const loggedIn=(req,res,next)=>{
    if(req.session.userId){
    res.redirect("/home")
    }else{
    next()
    }
    }
module.exports={requireLogin,loggedIn}