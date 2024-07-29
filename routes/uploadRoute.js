
const express = require('express')
const router = express()
const Product = require('../models/product')
const Category = require('../models/category')
const multer  = require('multer')
const { storage } = require('../upload')
const upload = multer({storage})
const { cloudinary  } = require('../upload')


//creating new category
router.get('/categories', async (req, res)=>{
    const categories = await Category.find({})
    console.log(categories)
    res.render('dashboard/categories', { categories,  showCartPopup: true  })
})
router.get('/category/new', (req, res)=>{
    res.render('dashboard/newCategory', { showCartPopup: true  })
})
router.get('/category/:name', async (req, res)=>{
    const { name } = req.params
    const category = await Category.findOne({name: name})
    console.log(category, 'Categoryyyyyyy')
    res.render('dashboard/individualCategory', { category,  showCartPopup: true  })
})



router.get('/:id/newproduct', async (req, res)=>{
    const { id } = req.params
    const category = await Category.findById(id)
    res.render('dashboard/categoryProduct', { category, showCartPopup: true })
    console.log(category)
})



// adding products
router.get('/products/new', (req, res)=>{
    res.render('dashboard/newProduct', { showCartPopup: true  })
})
router.post('/category/new', upload.single('image'), async (req, res)=>{
    const { name, description } = req.body.category
    const category = new Category({name: name, description: description})
    category.image = {url: req.file.path, filename: req.file.filename}
    await category.save()
    console.log(category, "Hereee is your category")
    res.redirect(`/menu/${category.name}`)
})

router.post('/products/new', upload.single('image'), async (req, res)=>{
    const { name, description, price, foodType} = req.body.Product
    const newPrice = parseInt(price)
    const newDescription = parseInt(description)
    const ogCategory = await Category.findOne({name: req.body.category})
    console.log(ogCategory, 'Hereeeee is your category')
    const product = new Product({name: name, foodType,  description:newDescription, price: newPrice})
    console.log(product, "Product!!!!!!!!")
    product.image = {url: req.file.path, filename: req.file.filename}
    product.category = ogCategory
    await product.save()
    ogCategory.products.push(product)
    await ogCategory.save()
    res.redirect('/products/new')
})




module.exports = router