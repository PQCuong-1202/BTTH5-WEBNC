const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb+srv://phanquoccuong1090:cuong12022004@mongodb.fmw0mjk.mongodb.net/shopping-cart')
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB", err));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình session
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

// Cấu hình View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const productDetailRoutes = require('./routes/product-detailRoutes');

// app.use('/', indexRoutes);
app.use('/', productRoutes);
app.use('/cart', cartRoutes);
app.use('/product-detail', productDetailRoutes);

const PORT = 3100;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


