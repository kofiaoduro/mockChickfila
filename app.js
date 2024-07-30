if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = process.env.PORT || 3000
const engine = require('ejs-mate');
const path = require('path')
const Category = require('./models/category')
const menuRoute = require('./routes/menuRoute')
const checkoutRoute = require('./routes/checkoutRoute')
const uploadRoute = require('./routes/uploadRoute')
const session = require('express-session')
const flash = require('connect-flash')
const { addShoppingCartToLocals } = require('./middleware')
const { loopThroughCartSession } = require('./middleware')
const User = require('./models/user')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const methodOverride = require('method-override')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const MongoStore = require('connect-mongo');
const { error } = require('console');
// Set EJS as the view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views' ));
app.use('/cssFiles', express.static('public/css/app.css'))
app.use('/imageFiles', express.static('public/images'))
app.use('/javascript', express.static('public/javascript/index.js'))

app.use(express.urlencoded({extended: true}))


const dbUrl = process.env.DB_URL
//'mongodb://127.0.0.1:27017/chickfilaApp'

main().catch(err => console.log(err));

async function main() {

        try{
            await mongoose.connect(dbUrl || 'mongodb://127.0.0.1:27017/chickfilaApp');
            serverSelectionTimeoutMS: 30000, // Increase server selection timeout
            console.log('database connected')
        }
        catch(e){
            console.log(e)
        }
  
}
const secret = process.env.SECRET || "This is my SECRET"
const store = new MongoStore({
    mongoUrl: dbUrl,
    secret,
    touchAfter: 24 * 60 * 60
});

store.on("error", function(e){
    console.error('Session Store Error:', e);
});

app.use(session({
    store,
    secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}))
app.use(flash())

app.use((req, res, next)=>{
    res.locals.currentUser
    next()
})

app.use(methodOverride('_method'))
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', addShoppingCartToLocals, loopThroughCartSession, async (req, res)=>{
    const categoryLinks = await Category.find({})
    .populate('products')
    console.log(categoryLinks)
    res.render('home', { categoryLinks,  showCartPopup: false  })
    console.log('Here is your session !!!!!!', req.session.shoppingCart)
})




app.use('/',  menuRoute)
app.use('/',  checkoutRoute)
app.use('/', uploadRoute)

app.listen(port, ()=>{
    console.log('Lisining to port 3000')
})





