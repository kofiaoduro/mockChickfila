const express = require('express')
const app = express()
const port = 3000
const engine = require('ejs-mate');
const path = require('path')


// Set EJS as the view engine
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views' ));


app.get('/', (req, res)=>{
    res.render('home')
    console.log('home request')
})




app.listen(port, ()=>{
    console.log('Lisining to port 3000')
})





