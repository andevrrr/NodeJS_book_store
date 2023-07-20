const path = require('path');

exports.getMain = (req, res, next) => {
    res.render('shop/main.ejs', {
        path: "/",
        pageTitle: 'Main'
    });
}

exports.getShop = (req, res, next) => {
    res.render("shop/shop.ejs", {
        path: "/shop",
        pageTitle: 'Shop'
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