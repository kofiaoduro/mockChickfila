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
    }
    catch(e){
        console.log(e)
        next(e)
    }
   
})
router.get('/cart',  isLoggedIn, (req, res)=>{
    res.render('cart', { showCartPopup: false } )
})
router.post('/cart/:id', (req, res)=>{
    const { id } = req.params
    //console.log(req.body.delete)
    //console.log(req.session.shoppingCart, 'my sessions')
    if (req.session.shoppingCart) {
        // Assuming req.body.delete contains the id to delete
        req.session.shoppingCart = req.session.shoppingCart.filter((elem) => {
            return elem.id !== req.body.delete[0];
        });
        res.redirect('/cart')
       // console.log(req.session.shoppingCart);
    }
    
})
router.post('/menu/:name', async (req, res)=>{
    const { name } = req.params
    const item = await Product.findOne({name: name})
    .populate('category')
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
                    //console.log('Here is your single.item', req.session.Item)
                }
            }catch(e){
                    console.log(e)
            }
        }
    req.session.shoppingCart.push(req.body)
   // console.log('Here is your session !!!!!!', req.session.shoppingCart)
    res.redirect(`/menu/${item.category.name}`)
})


module.exports = router