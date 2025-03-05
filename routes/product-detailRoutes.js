const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Sản phẩm không tồn tại');
        res.render('product-detail', { product });
    } catch (err) {
        res.status(500).send('Lỗi khi lấy thông tin sản phẩm');
    }
});

module.exports = router;
