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

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422)
            .render('auth/login', {
                path: "/login",
                pageTitle: "Login",
                errorMessage: errors.array()[0].msg,
                validationErrors: [{ param: 'email', param: 'password' }],
                oldInput: {
                    email: email,
                    password: password
                }
            })
    }

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(422)
                    .render('auth/login', {
                        path: "/login",
                        pageTitle: "Login",
                        errorMessage: 'Such email is not registered',
                        validationErrors: [{ param: 'email', param: 'password' }],
                        oldInput: {
                            email: email,
                            password: password
                        }
                    })
            }
            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/')
                        })
                    }
                    return res.status(422)
                        .render('auth/login', {
                            path: "/login",
                            pageTitle: "Login",
                            errorMessage: 'Invalid Password',
                            validationErrors: [{ param: 'email', param: 'password' }],
                            oldInput: {
                                email: email,
                                password: password
                            }
                        })
                })
                .catch(err => {
                    console.log(err);
                    return res.redirect('/login')
                })
        })
        .catch(err => {
            console.log(err);
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

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/')
    })
}