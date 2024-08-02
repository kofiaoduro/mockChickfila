const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware');
const passport = require('passport');
const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/product');
const { loopThroughCartSession } = require('../middleware');
const { verifyPassword } = require('../middleware')
const BASE_URL = 'https://protected-bayou-30650-01c800256a90.herokuapp.com' ||  "http://localhost:3000";

router.get('/login', (req, res) => {
    res.render('login', { showCartPopup: false });
});
router.get('/logout', (req, res) => {
    if (req.session.shoppingCart) {
        req.session.shoppingCart = null; // Destroy the shopping cart session
    }
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/'); // Redirect to home or another appropriate page
    });
});
router.get('/register', (req, res) => {
    res.render('register', { showCartPopup: false });
});

router.post('/register', verifyPassword, async (req, res, next) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username});
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
        return next(e)
    }
});

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
    keepSessionInfo: true
}), (req, res) => {
    req.session.currentUser = req.user
    if (req.session.returnTo) {
        const redirectUrl = req.session.returnTo;
       // console.log(redirectUrl, 'This is your return To');
        req.session.returnTo = null;
        return res.redirect(redirectUrl);
    }
    res.redirect('/');
});

router.post('/checkout',  loopThroughCartSession, async (req, res) => {
    console.log(req.session.shoppingCart);
    console.log('Cart Items:', res.locals.cartItems);
    const lineItems = res.locals.cartItems.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.name,
                images: [item.image.thumbnail || item.image.url], // Use the thumbnail URL
            },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
    }));
    try {
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['US', 'CA']
            },
            success_url: `${BASE_URL}/complete`,
            cancel_url: `${BASE_URL}/cancel`
        });
        res.redirect(session.url);
    } catch (e) {
        console.log(e);
    }
});

router.get('/complete', (req, res) => {
    req.flash('success', 'Your payment was succesful')
    req.session.shoppingCart = null
    res.redirect('/');
});

router.get('/cancel', (req, res) => {
    req.flash('error', 'Unable to process your payment')
    res.redirect('/cart');
});

module.exports = router;
