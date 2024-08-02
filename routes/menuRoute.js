const express = require('express')
const router = express.Router()
const Category = require('../models/category')
const Product = require('../models/product')
const Cart = require('../models/cart')
const { fetchCategoryLinks } = require('../middleware')
const { addShoppingCartToLocals } = require('../middleware')
const { loopThroughCartSession } = require('../middleware')
const { isLoggedIn } = require('../middleware')
router.use(fetchCategoryLinks);
router.use(addShoppingCartToLocals);
router.use(loopThroughCartSession);


router.get('/menu/:name', async (req, res, next)=>{
    try{
        const { name} = req.params
        const categoryLink = await Category.findOne({name})
        .populate('products')
        if(!categoryLink){
            throw new Error('category name not found', 404)
        }
        res.render('menu',{ categoryLink, itemOnly: res.locals.itemOnly, showCartPopup: true  })
        console.log(categoryLink)
    }
    catch(e){
        console.log(e)
        next(e)
    }
   
})
router.get('/cart',  isLoggedIn, (req, res)=>{
    res.render('cart', { showCartPopup: false } )
})
router.post('/menu/:name', async (req, res)=>{
    const { name } = req.params
    console.log(req.body, 'My Body!!!!!!!!!!')
    const item = await Product.findOne({name: name})
    .populate('category')
    console.log('Here is your item !!!!!!',item)

    if (!req.session.shoppingCart) {
        req.session.shoppingCart = [];

    } 
    if(!req.session.Item){
        req.session.Item = [];
    }

        if(req.body && req.body.id){
            try{
                const singleItem = await Product.findById(req.body.id)
                .populate('category')
                if(singleItem){
                    req.session.Item = singleItem
                    console.log('Here is your single.item', req.session.Item)
                }
            }catch(e){
                    console.log(e)
            }
        }
    req.session.shoppingCart.push(req.body)
    console.log('Here is your session !!!!!!', req.session.shoppingCart)
    res.redirect(`/menu/${item.category.name}`)
})


module.exports = router