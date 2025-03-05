// const express = require('express');
// const router = express.Router();
// const Product = require('../models/Product');

// router.get('/', async (req, res) => {
//     try {
//         const products = await Product.find();
//         res.render('product', { products });
//     } catch (err) {
//         res.status(500).send('Lỗi khi lấy danh sách sản phẩm');
//     }
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Lấy danh sách sản phẩm
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('product', { products });
    } catch (err) {
        res.status(500).send('Lỗi khi lấy danh sách sản phẩm');
    }
});

// Hiển thị form tạo sản phẩm
router.get('/create', (req, res) => {
    res.render('create-product');
});

// Xử lý tạo sản phẩm
router.post('/create', async (req, res) => {
    try {
        const { name, price, image } = req.body;
        const newProduct = new Product({ name, price, image });
        await newProduct.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Lỗi khi tạo sản phẩm');
    }
});

// Hiển thị form sửa sản phẩm
router.get('/edit/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.render('edit-product', { product });
    } catch (err) {
        res.status(500).send('Lỗi khi lấy thông tin sản phẩm');
    }
});

// Xử lý sửa sản phẩm
router.post('/edit/:id', async (req, res) => {
    try {
        const { name, price, image } = req.body;
        const productId = req.params.id;

        // Cập nhật sản phẩm trong cơ sở dữ liệu
        await Product.findByIdAndUpdate(productId, { name, price, image });

        // Chuyển hướng người dùng về trang danh sách sản phẩm
        res.redirect('/');
    } catch (err) {
        console.error('Lỗi khi cập nhật sản phẩm:', err);
        res.status(500).send('Lỗi khi cập nhật sản phẩm');
    }
});

// Xử lý xóa sản phẩm
router.post('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Lỗi khi xóa sản phẩm');
    }
});

module.exports = router;