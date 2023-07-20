const express = require('express');

const router = express();

const adminController = require('../controllers/admin');

router.get('/create', adminController.getCreate);

router.post('/create', adminController.postProduct);

router.get('/products', adminController.getProducts);


module.exports = router;