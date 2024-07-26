const express = require('express')
const app = express()
const port = 3000
const engine = require('ejs-mate');
const path = require('path')
const Category = require('./models/category')
const menuRoute = require('./routes/menuRoute')
const session = require('express-session')
const flash = require('connect-flash')
const { addShoppingCartToLocals } = require('./middleware')
const { loopThroughCartSession } = require('./middleware')
// Set EJS as the view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views' ));

app.use('/cssFiles', express.static('public/css/app.css'))
app.use('/imageFiles', express.static('public/images'))
app.use('/javascript', express.static('public/javascript/index.js'))

app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'My Secret',
    resave: false,
    saveUninitialized: false
}))

app.use(flash())


app.get('/', addShoppingCartToLocals, loopThroughCartSession, async (req, res)=>{
    const categoryLinks = await Category.find({})
    .populate('products')
    console.log(categoryLinks)
    res.render('home', { categoryLinks })
    console.log('Here is your session !!!!!!', req.session.shoppingCart)
})


app.use('/',  menuRoute)


app.listen(port, ()=>{
    console.log('Lisining to port 3000')
})





