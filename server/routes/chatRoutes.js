const path=require("path")
module.exports=app=>{
    app.get("/",(req,res)=>{
       const pathHtml= path.resolve(__dirname,"../html/index.html");
        res.sendFile(pathHtml)
    })
}