const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const port = process.env.PORT || 3000;

app.get("/", (req,res)=> {
    res.sendFile(__dirname + "/index.html");
})

io.on("connection", (socket) => {
    console.log("user is connecting");

    socket.on("chat message", (msg)=>{
        // console.log(msg);
        io.emit("chat message", msg);
    })
})

server.listen(port, ()=>{
    console.log("listening to " + port);
})