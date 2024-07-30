
const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware')
const passport = require('passport')
const User = require('../models/user')
const Stripe = require('stripe')
const Product = require('../models/product')
const { loopThroughCartSession } = require('../middleware')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
router.get('/login', (req, res)=>{
    res.render('login', {showCartPopup: false  })
    
})

router.get('/register', (req, res)=>{
    res.render('register', {showCartPopup: false  })
})



router.post('/register', async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username });
        const newUser = await User.register(user, password);
        console.log(newUser);
        req.logIn(newUser, (err) => {
            if (err) {
                console.log(err);
                return next(err); // Make sure to call next() to pass the error to the error handler middleware
            }
            return res.redirect('/');
        });
    } catch (e) {
        console.log(e);
        // Handle the registration error and send a response
        res.redirect('/register'); // Or handle it appropriately
    }
});

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    keepSessionInfo: true
}), (req, res) => {
    if (req.session.returnTo) {
        const redirectUrl = req.session.returnTo;
        console.log(redirectUrl, 'This is your return To')
        req.session.returnTo = null; 
        return res.redirect(redirectUrl);
    }
    res.redirect('/');
});



router.post('/checkout', loopThroughCartSession, async (req, res)=>{
    console.log(req.session.shoppingCart)
    console.log('Cart Items:', res.locals.cartItems);
   const lineItems = res.locals.cartItems.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image.url], // Add image URL,
            },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
    }));
    try{
        const session = await stripe.checkout.sessions.create({
            line_items:lineItems,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA']
            },
            success_url: `${process.env.process.env.PORT}/complete`,
            cancel_url: `${process.env.process.env.PORT}/cancel`
        })
        res.redirect(session.url)
    }
    catch(e){
        console.log(e)
    }
})


router.get('/complete', (req, res)=>{
    res.send('Your payment was successful')
})

router.get('/cancel', (req, res)=>{
    res.redirect('/cart')
})
module.exports = router