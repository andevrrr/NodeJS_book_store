const express = require('express');

const router = express();

const shopController = require('../controllers/shop');

router.get('/', shopController.getMain);

router.get('/shop', shopController.getShop);

router.get('/cart', shopController.getCart);

router.get('/orders', shopController.getOrders);

module.exports = router;