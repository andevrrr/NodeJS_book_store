const express = require('express');

const router = express();

const isAuth = require('../middleware/is-auth');
const shopController = require('../controllers/shop');

router.get('/', shopController.getMain);

router.get('/shop', shopController.getShop);

router.get('/details/:productId', shopController.getDetails);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.get('/orders', isAuth, shopController.getOrders);

module.exports = router;