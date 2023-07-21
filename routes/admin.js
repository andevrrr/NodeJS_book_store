const express = require('express');

const router = express();

const adminController = require('../controllers/admin');

router.get('/create', adminController.getCreate);

router.post('/create', adminController.postProduct);

router.get('/products', adminController.getProducts);

router.post('/products', adminController.postDeleteProduct);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post('/edit-product', adminController.postEditProduct);


module.exports = router;