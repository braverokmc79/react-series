const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const SECRET_KEY = "abcd!!!333";


const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }

})

//몽고DB 에 저장하기 전에 실행하는 함수
userSchema.pre('save', function (next) {
    const user = this;

    //비밀번호가 변환될때면 다음을 실행한다.
    if (user.isModified('password')) {

        //비밀번호를 암호와 시킨다.
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });

        });

    } else {
        next();
    }
})


//userSchema.methods  => 커스텀 함수 생성
userSchema.methods.comparePassword = function (plainPassword, cb) {
    //plainPassword 비밀번호가 12345 일때,   this.password 는 암호화된 비밀번호 $2b$10$LK86g2vaPNMHVLkj69hO7uzodTXATNMezdKnWymKi8QoTX9pE3bey
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        else return cb(null, isMatch);
    });
}

userSchema.methods.generateToken = function (cb) {
    //몽고DB 에 저장된 형태
    /*  _id:ObjectId("630edadb1f06e2b0be7adeea")
        name:"홍길동"
        email:"test1@gmail.com"
        password: "$2b$10$LK86g2vaPNMHVLkj69hO7uzodTXATNMezdKnWymKi8QoTX9pE3bey"
        role: 0
        __v:0
    */
    //jwt.sign({ foo: 'bar' }, 'shhhhh');  shhhhh 는 임이 문자
    //jsonwebtoken 을 이용해서 token 을 생성하기
    const user = this;

    const token = jwt.sign(user._id.toHexString(), SECRET_KEY);

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    });
}


userSchema.statics.findByToken = function (token, cb) {
    const user = this;

    /***  토큰을 decode 한다.***/

    //user._id+''=token
    //const SECRET_KEY: "abcd!!!333"
    jwt.verify(token, SECRET_KEY, function (err, decoded) {

        //1) 라이언트에서 가져온 토큰과 SECRET_KEY 값과 조합을 해서 decoded 값을 생성한다.
        //여기서 decoded 는 user._id 가 된다. 만약 SECRET_KEY 불일치로 조합에 실패할 경우 
        //decoded 값인 user._id 는  undefined 가 된다.


        //2)decoded 하연 생성된 유저아이디와 토큰값을 이용해서 DB에서 정보를 가져온다.
        //3)DB에 가져온 데이터가 없으면 에러, 있으면 유저 정보값을 콜백으로 반환시켜 미들웨어 auth 에서 처리 시킨다.

        console.log("클라이언트에서 가져온 토큰값 :", token);
        console.log("decoded 는 user._id  :", decoded);


        //예
        //클라이언트에서 가져온 토큰값: eyJhbGciOiJIUzI1NiJ9.NjMwZWRhZGIxZjA2ZTJiMGJlN2FkZWVh.venwg5 - aVAvLA72IDSa1VNkls2MYwK6zXp3wJKSrn6k
        //ecoded 는 user._id  : 630edadb1f06e2b0be7adeea
        //findOne() 은 몽고DB함수
        user.findOne({ "_id": decoded, "token": token }, function (err, user) {
            if (err) return cb(err)
            cb(null, user);

        });

    });



}


const User = mongoose.model('User', userSchema);


module.exports = { User };


