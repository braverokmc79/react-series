const express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");

//const mongodbURI = require('./mongodbURI')

//aplication/json
app.use(bodyParser.json());
//application/x-www-form-unlencoded
// body-parser deprecated undefined extended
//app.use(bodyParser.urlencoded({ extends: true }));
//Mongoose 6은 항상 useNewUrlParser, useUnifiedTopology 및 useCreateIndex가 true이고 useFindAndModify가 false인 것처럼 작동



mongoose.connect(config.mongoURI,
).then(() => console.log("MongoDB Connected...")).catch(err => console.error("에러 :", err));

console.log("ENV 정보 : ", process.env.NODE_ENV);



app.get('/', (req, res) => { res.send('Hello World! 안녕하세요.11') })
app.post('/register', (req, res) => {
    //회원 가입 할때 필요한 정보들을  client 에서 가져오면
    //그것들을 데이터 베이스에 넣어준다.
    const user = new User(req.body);

    //몽고 DB 에 설정된 save  사용
    user.save((err, doc) => {
        if (err) {
            return res.json({
                success: false,
                err
            })
        }
        return res.status(200).json({ success: true });
    });

});




app.listen(port, () => { console.log(`Example app listening on port ${port}`) })


