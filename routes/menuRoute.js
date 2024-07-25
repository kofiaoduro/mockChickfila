const express = require('express')
const router = express.Router()
const Category = require('../models/category')



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




module.exports = router