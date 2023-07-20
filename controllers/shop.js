const path = require('path');

const Product = require('../models/product');

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

exports.getCart = (req, res, next) => {
    res.render("shop/cart.ejs", {
        path: "/cart",
        pageTitle: 'Cart'
    })
}

exports.getOrders = (req, res, next) => {
    res.render("shop/orders.ejs", {
        path: "/orders",
        pageTitle: 'Orders'
    })
}

