const express = require("express")
const dotenv = require("dotenv")
const todoHandeler = require("./routeHandeler/todoHandeler")
const userHandeler = require("./routeHandeler/userHandeler")
const mongoose = require('mongoose');

const app = express();
dotenv.config();
app.use(express.json());


mongoose
    .connect('mongodb://127.0.0.1:27017/todos', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("connect successful"))
    .catch(err => console.log(err))



app.use("/todo", todoHandeler)
app.use("/user", userHandeler)

app.get("/", (req, res) => {
    res.send("<h1>_route get</h1>")
})


// error handeler

// function errorHandeler(err, req, res, next) {
//     if (res.headerSent) {
//         return next(err)
//     }
//     res.status(500).json({
//         error: (err)
//     })
// }
app.listen(10000, () => {
    console.log("server is running port 5000");

})