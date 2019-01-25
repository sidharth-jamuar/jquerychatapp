const path=require("path")
const {requireLogin,loggedIn}=require("../middleware/requireLogin")
const sessionUsers=[
    {id:1,name:"sidharth",email:"sidharth@gmail.com",password:"secret"},
    {id:2,name:"akanksha",email:"akanksha@gmail.com",password:"secret2"},
    {id:3,name:"sid",email:"sid@gmail.com",password:"secret3"},
    {id:4,name:"ak",email:"ak@gmail.com",password:"secret4"}
]
module.exports=app=>{
    app.get("/",(req,res)=>{
        const {userId}=req.session
        console.log(req.session.id)
    //    const pathHtml= path.resolve(__dirname,"../html/index.html");
    //     res.sendFile(pathHtml)
    res.send(`
    <h2>Welcome!<h2>
    ${userId ?`<a href="/home">Home</a>
    <form method="POST" action="/logout">
    <button>Logout</button>
    </form>`:` <a href="/login">Login</a>
    <a href="/register">Register</a>
    `
    }`)
    });
    app.get("/login",loggedIn,(req,res)=>{
        res.send(`
        <h1>Login</h1>
        <form method="POST" action="/login">
        Email:<input type="text" name="email" />
        Password:<input type="text" name="password" />
        <input type="submit" />
        </form>
        <a href="/register>Register</a>
        `)
    })
    app.get("/home",requireLogin,(req,res)=>{
        const user=sessionUsers.find(user=>user.id===req.session.userId)
        res.send(`
        <h1>Home</h1>
        <div>Name:${user.name}</div>
        <div>Email:${user.email}</div>`)
    })
    app.post("/login",(req,res)=>{
        console.log(req.body)
        const {email,password}=req.body;
        if(email && password){
            sessionUser=sessionUsers.find(user=>user.email===email && user.password===password)
        }
        if(sessionUser){
            req.session.userId=sessionUser.id
            console.log(req.session.userId)
            return res.redirect("/home")
        }
        res.redirect("/login")
    })
    app.get("/register",loggedIn,(req,res)=>{
        res.send(`
        <h1>Register</h1>
        <form method="POST" action="/register">
        
        Name:<input type="text" name="name" />
        Email:<input type="text name="email" />
        Password:<input type="text" name="password" />
        <input type="submit" />
        </form>
        <a href="/login>Login</a>
        `)
    })
    app.post("/register",(req,res)=>{

    })
    app.post("/logout",requireLogin,(req,res)=>{
        req.session.destroy(err=>{
            if(err){
              return  res.redirect("/home")
            }
            else{
                res.clearCookie('sid')
                res.redirect("/")
            }
        })
    })
}