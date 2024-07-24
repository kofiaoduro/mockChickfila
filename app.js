const express = require('express')
const app = express()
const port = 3000
const engine = require('ejs-mate');
const path = require('path')


// Set EJS as the view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views' ));

app.use('/CssFiles', express.static('public/css/app.css'))

app.get('/', (req, res)=>{
    res.render('home')
})




app.listen(port, ()=>{
    console.log('Lisining to port 3000')
})





