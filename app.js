const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const app = express();

//MongoDB
const mongoose = require('mongoose');

const MONGODB_URI =
    `mongodb+srv://anton:PLiaApfQ7vwmm0wZ@cluster0.ged35hr.mongodb.net/books`;


// routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes =  require('./routes/auth');

app.set('view engine', 'ejs');
app.set('views', 'views');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter}).single('image'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })