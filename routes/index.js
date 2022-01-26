const express = require('express');
const productRouter = require('./products');
const saleRouter = require('./sales');

const router = express.Router();

router.use('/products', productRouter);
router.use('/sales', saleRouter);

module.exports = router; 