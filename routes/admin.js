const path = require('path');

const express = require('express');

const adminController = require('../Controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

router.post('/edit-product/:productId', adminController.getEditProduct);

router.post('/delete-product', adminController.deletrProducts);
module.exports = router;
