const bcrypt = require('bcryptjs');

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
}