const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//MongoDB
const mongoose = require('mongoose');

const MONGODB_URI =
    `mongodb+srv://anton:PLiaApfQ7vwmm0wZ@cluster0.ged35hr.mongodb.net/books`;


// routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })