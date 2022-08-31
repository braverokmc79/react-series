const express = require('express')
const app = express()
const port = 5000
const mongoose = require("mongoose");
const { User } = require("./models/User");
const bodyParser = require("body-parser");
const config = require("./config/key");
const cookieParser = require("cookie-parser");


//const mongodbURI = require('./mongodbURI')

//aplication/json
app.use(bodyParser.json());
//application/x-www-form-unlencoded
// body-parser deprecated undefined extended
//app.use(bodyParser.urlencoded({ extends: true }));
//Mongoose 6은 항상 useNewUrlParser, useUnifiedTopology 및 useCreateIndex가 true이고 useFindAndModify가 false인 것처럼 작동


app.use(cookieParser());


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


app.post('/login', (req, res) => {

    //1.요청된 이메일을 데이터베이스에서 찾는다.
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user) {
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        //2.요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호 인지 확인
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch) return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." });

            //3.비밀 번호까지 같다면 Token을 생성
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);

                //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지
                res.cookie("x_auth", user.token).status(200).json({
                    loginSuccess: true,
                    userId: user._id,
                    token: user.token
                })

            });

        })


    });


});
