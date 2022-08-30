const express = require('express')
const app = express()
const port = 5000
const mongodbURI = require('./mongodbURI')
const mongoose = require("mongoose");
const User = require("./models/User");

console.log("User : ", User);

//Mongoose 6은 항상 useNewUrlParser, useUnifiedTopology 및 useCreateIndex가 true이고 useFindAndModify가 false인 것처럼 작동
// mongoose.connect(mongodbURI,
// ).then(() => console.log("MongoDB Connected...")).catch(err => console.error("에러 :", err));

app.get('/', (req, res) => {
    res.send('Hello World! 안녕하세요.')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})