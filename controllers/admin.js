const path = require('path');

const Product = require('../models/product');

exports.getCreate = (req, res, next) => {
    res.render('admin/create.ejs', {
        path: '/admin/create',
        pageTitle: 'Create'
    });
}

exports.getProducts = (req, res, next) => {
    Product.find()
    .then(products => {
        res.render('admin/products.ejs', {
            path: '/admin/products',
            pageTitle: 'Admin products',
            products: products
        });
    })
    .catch(err => {
        console.log(err);
    })
}

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product({
        title: title,
        price: price,
        description: description
    })

    product.save()
        .then(result => {
            console.log('Product Created!');
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
}