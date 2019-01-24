const app=require("express")();
const server=require("http").createServer(app)
const io=require("socket.io").listen(server);
var users={};
const PORT=process.env.PORT || 3004;

require("./routes/chatRoutes")(app)

io.sockets.on('connection',socket=>{
    socket.on('send message',data=>{
        let msg=data.trim();
        if(msg.substr(0,3)==="/w "){
            console.log("private")
            msg=msg.substr(3);
            var index=msg.indexOf(' ')
            var name=msg.substring(0,index);
            mainmsg=msg.substring(index+1)
            if(name in users){
                socket.emit("whisper",{msg:msg,nick:socket.nickname})
                users[name].emit("whisper",{msg:msg,nick:socket.nickname})
            }
        }
        else{
        io.sockets.emit('new-message',{msg:msg,nick:socket.nickname});
        }
    })
    function updateNicknames(){
        io.sockets.emit('user list',Object.keys(users));
    }
    socket.on('new user',(data,callback)=>{
        
        if(data in users){
            callback(false)
        }
        else{
            callback(true);
            socket.nickname=data;
            users[socket.nickname]=socket
            updateNicknames();
            
        }
    })
    socket.on("disconnect",data=>{
        if(!socket.nickname){
            return;
        }
        else{
           
           delete users[socket.nickname]
           updateNicknames();
        }
    })
})
server.listen(PORT,()=>{
    console.log("server started at"+PORT)
})