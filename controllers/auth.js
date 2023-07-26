const bcrypt = require('bcryptjs');
const User = require('../models/user');
exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: "/login",
        pageTitle: "Login"
    })
}

exports.getSignup = (req, res, next) => {
    res.render('auth/signup', {
        path: "/signup",
        pageTitle: "Signup"
    })
}

exports.postSignUp = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    bcrypt.hash(password, 12)
        .then(hashedPassword => {

            const user = new User({
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            })
            return user.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            console.log(err);
        })

}