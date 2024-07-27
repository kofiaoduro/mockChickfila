const express = require('express')
const router = express.Router()
const { isLoggedIn } = require('../middleware')


router.get('/checkout', isLoggedIn, (req, res)=>{
    res.send('Checkout page')
})

router.get('/login', (req, res)=>{
    res.render('login', {showCartPopup: false  })
})

router.get('/register', (req, res)=>{
    res.render('register', {showCartPopup: false  })
})



module.exports = router