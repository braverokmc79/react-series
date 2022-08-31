const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(user._id.toHexString(), "abcd!!!333");

    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    });
}



const User = mongoose.model('User', userSchema);


module.exports = { User };


