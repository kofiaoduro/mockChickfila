const express = require('express')
const router = express.Router()
const Category = require('../models/category')



router.get('/menu/:name', async (req, res)=>{
    const { name} = req.params
    const categoryLink = await Category.find({name})
    res.render('menu',{ categoryLink })
    console.log(categoryLink)

})




module.exports = router