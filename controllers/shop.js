const path = require('path');
const Product = require('../models/product');
const product = require('../models/product');
const User = require('../models/user');

exports.getMain = (req, res, next) => {
    res.render('shop/main.ejs', {
        path: "/",
        pageTitle: 'Main'
    });
}

exports.getShop = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render("shop/shop.ejs", {
                path: "/shop",
                pageTitle: 'Shop',
                products: products
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getDetails = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            res.render("shop/details.ejs", {
                path: "/details",
                pageTitle: 'Details',
                product: product
            })
        })
        .catch(err => {
            console.log(err);
        })
}

exports.getCart = (req, res, next) => {
    // Make sure req.user is defined
    if (!req.user) {
        return res.redirect('/login');
    }

    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            res.render("shop/cart.ejs", {
                path: "/cart",
                pageTitle: 'Your cart',
                products: products
            });
        })
        .catch(err => {
            console.log(err);
        });
}


exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart');
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        });
}

exports.cartDeleteItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
    .then(product => {
        return req.user.removeFromCart(prodId);
    })
    .then(result => {
        res.redirect('/cart');
        console.log(result);
    })
    .catch(err => {
        console.log(err);
    })
}

exports.getOrders = (req, res, next) => {
    res.render("shop/orders.ejs", {
        path: "/orders",
        pageTitle: 'Orders'
    })
}

