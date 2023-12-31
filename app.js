const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const multer = require('multer');
const flash = require('connect-flash');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');

const errorController = require('./controllers/error');

//MongoDB
const mongoose = require('mongoose');

const MONGODB_URI =
    `mongodb+srv://anton:PLiaApfQ7vwmm0wZ@cluster0.ged35hr.mongodb.net/books`;

const csrfProtection = csrf();

const app = express();
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

store.on('error', (error) => {
    console.error('Error in MongoDB session store:', error);
  });
  
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

app.use(
    session(
        {
            secret: 'my secret',
            resave: false,
            saveUninitialized: false,
            store: store
        }
    )
)

app.use(csrfProtection);
app.use((flash()));

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
})



app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.get('/500', errorController.get500);

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500',
        isAuthenticated: req.session.isLoggedIn
    })
})

mongoose.connect(MONGODB_URI)
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    })