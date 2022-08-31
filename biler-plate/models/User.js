const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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


const User = mongoose.model('User', userSchema);


module.exports = { User };


