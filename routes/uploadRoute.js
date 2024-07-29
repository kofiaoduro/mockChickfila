const express = require('express')
const router = express()
const Product = require('../models/product')
const Category = require('../models/category')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

router.get('/category/new', (req, res)=>{
    res.render('dashboard/newCategory', { showCartPopup: true  })
})
router.post('/category/new', upload.single('image'), (req, res)=>{
    res.send(req.body)
    console.log(req.file)
    console.log(req.body)
})





module.exports = router