const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const Product = require('../models/product')
const Cart = require('../models/cart')
const { fetchCategoryLinks } = require('../middleware')
const { addShoppingCartToLocals } = require('../middleware')
const { loopThroughCartSession } = require('../middleware')

router.use(fetchCategoryLinks);
router.use(addShoppingCartToLocals);
router.use(loopThroughCartSession);

router.get('/menu/:name', async (req, res)=>{
    try{
        console.log('Got a get request')
        const { name} = req.params
        const categoryLink = await Category.findOne({name})
        .populate('products')
        res.render('menu',{ categoryLink })
        console.log(categoryLink)
    }
    catch(e){
        console.log(e)
    }
   
})
router.get('/cart', (req, res)=>{
    res.render('cart')
})
router.post('/menu/:name', async (req, res)=>{
    const { name } = req.params
    const item = await Product.findOne({name: name})
    .populate('category')
    console.log('Here is your item !!!!!!',item)

    if (!req.session.shoppingCart) {
        req.session.shoppingCart = [];
    }  
    req.session.shoppingCart.push(req.body)
   
    console.log('Here is your session !!!!!!', req.session.shoppingCart)
    res.redirect(`/`)
    console.log(req.body)
})


module.exports = router