const fileHelper = require('../utils/file');
const Product = require('../models/product');

exports.getCreate = (req, res, next) => {
    res.render('admin/create.ejs', {
        path: '/admin/create',
        pageTitle: 'Create',
        editing: false
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
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;

    const imageUrl = image.path;
    console.log(imageUrl);

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.session.user._id
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

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/create.ejs', {
                path: '/admin/edit-product',
                pageTitle: 'Edit Product',
                editing: editMode,
                product: product
            });

        })
        .catch(err => {
            console.log(err);
        })
}

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;

    Product.findById(prodId)
        .then(product => {
            product.title = title;
            if (image) {
                fileHelper.deleteFile(product.imageUrl);
                product.imageUrl = image.path;
            }
            product.price = price;
            product.description = description;

            return product.save()
                .then(result => {
                    console.log('Product Updated!');
                    res.redirect('/admin/products');
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => {
            console.log(err);
        })

}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                console.log("Product not found");
            }
            fileHelper.deleteFile(product.imageUrl);
            return Product.deleteOne({ _id: prodId })
        })
        .then(() => {
            res.redirect('/admin/products');
            console.log("Product deleted");
        })
        .catch(err => {
            console.log(err);
        })
}