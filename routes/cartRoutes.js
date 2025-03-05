
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
    try {
        req.session.cart = req.session.cart || {};  // Đảm bảo giỏ hàng tồn tại
        const cart = req.session.cart;

        const cartItems = await Product.find({ _id: { $in: Object.keys(cart) } });

        res.render('cart', { cartItems, cart }); // ✅ Truyền cart vào EJS
    } catch (err) {
        res.status(500).send('Lỗi khi lấy giỏ hàng');
    }
});

// Thêm sản phẩm vào giỏ hàng
router.post('/add/:id', (req, res) => {
    const productId = req.params.id;
    req.session.cart = req.session.cart || {};

    if (req.session.cart[productId]) {
        req.session.cart[productId]++;
    } else {
        req.session.cart[productId] = 1;
    }

    res.redirect('/cart');
});

// Cập nhật số lượng sản phẩm
router.post('/update/:id', (req, res) => {
    const productId = req.params.id;
    const action = req.body.action;

    if (req.session.cart && req.session.cart[productId]) {
        if (action === "increase") {
            req.session.cart[productId]++;
        } else if (action === "decrease" && req.session.cart[productId] > 1) {
            req.session.cart[productId]--;
        }
    }

    res.redirect('/cart');
});

// Xóa sản phẩm khỏi giỏ hàng
router.post('/remove/:id', (req, res) => {
    const productId = req.params.id;

    if (req.session.cart && req.session.cart[productId]) {
        delete req.session.cart[productId];
    }

    res.redirect('/cart');
});

// Tiền tổng của 1 sản phẩm theo số lượng sản phẩm

// Tiền tổng của tất cả sản phẩm có trong giỏ hàng

module.exports = router;

