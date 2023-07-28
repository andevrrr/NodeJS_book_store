const express = require('express');

const router = express();

const isAuth = require('../middleware/is-auth');
const adminController = require('../controllers/admin');

router.get('/create', isAuth, adminController.getCreate);

router.post('/create', isAuth, adminController.postProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/products', isAuth, adminController.postDeleteProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);


module.exports = router;