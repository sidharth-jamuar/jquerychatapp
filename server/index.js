const app=require("express")();
const server=require("http").createServer(app)
const io=require("socket.io").listen(server);
var nicknames=[];
const PORT=process.env.PORT || 3004;

require("./routes/chatRoutes")(app)

io.sockets.on('connection',socket=>{
    socket.on('send message',data=>{
        
        io.sockets.emit('new-message',{msg:data,nick:socket.nickname});
    })
    function updateNicknames(){
        io.sockets.emit('user list',nicknames);
    }
    socket.on('new user',(data,callback)=>{
        
        if(nicknames.indexOf(data)!== -1){
            callback(false)
        }
        else{
            callback(true);
            socket.nickname=data;
            nicknames.push(socket.nickname);
            updateNicknames();
            
        }
    })
    socket.on("disconnect",data=>{
        if(!socket.nickname){
            return;
        }
        else{
           
           nicknames.splice(nicknames.indexOf(socket.nickname),1)
           updateNicknames();
        }
    })
})
server.listen(PORT,()=>{
    console.log("server started at"+PORT)
})