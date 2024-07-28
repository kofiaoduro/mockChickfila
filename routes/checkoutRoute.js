const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware')
const passport = require('passport')
const User = require('../models/user')

router.get('/checkout', isLoggedIn, (req, res) => {
    res.render('checkout');
});
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
    console.log('Session before redirect:', req.session);
    if (req.session.returnTo) {
        const redirectUrl = req.session.returnTo;
        req.session.returnTo = null; // Clear the original URL from the session
        console.log('Redirecting to:', redirectUrl);
        return res.redirect(redirectUrl);
    }
    console.log('Redirecting to home page');
    res.redirect('/');
});


module.exports = router