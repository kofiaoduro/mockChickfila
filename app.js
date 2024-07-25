const express = require('express')
const app = express()
const port = 3000
const engine = require('ejs-mate');
const path = require('path')
const Category = require('./models/category')
const menuRoute = require('./routes/menuRoute')
// Set EJS as the view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views' ));

app.use('/cssFiles', express.static('public/css/app.css'))
app.use('/imageFiles', express.static('public/images'))

app.get('/', async (req, res)=>{
    const categoryLinks = await Category.find({})
    .populate('products')
    console.log(categoryLinks)
    res.render('home', { categoryLinks })
})


app.use('/', menuRoute)


app.listen(port, ()=>{
    console.log('Lisining to port 3000')
})





