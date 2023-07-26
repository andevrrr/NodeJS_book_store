const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: "/login",
        pageTitle: "Login",
        errorMessage: message,
        validationErrors: [],
        oldInput: {
            email: "",
            password: '',
            confirmPassword: ''
        }
    })
}

exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/signup', {
        path: "/signup",
        pageTitle: "Signup",
        errorMessage: message,
        validationErrors: [],
        oldInput: {
            email: "",
            password: '',
            confirmPassword: ''
        }
    })
}

exports.postSignUp = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422)
            .render('auth/signup', {
                path: "/signup",
                pageTitle: "Signup",
                errorMessage: errors.array()[0].msg,
                validationErrors: [{ param: 'email', param: 'password' }],
                oldInput: {
                    email: email,
                    password: password,
                    confirmPassword: req.body.confirmPassword
                }
            });
    }

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