
const express = require('express')
const router = express()
const Product = require('../models/product')
const Category = require('../models/category')
const multer  = require('multer')
const { storage } = require('../upload')
const upload = multer({storage})
const { cloudinary  } = require('../upload')

router.get('/dashboard', async(req, res)=>{
    try{
        // find all the products with the recent date and only show me their name description date and price and image
        const products = await Product.find({date: {$ne: null}}, {name: 1, description: 1, date:1, price:1, image:1}).sort({ date: -1 }).limit(3);
        console.log(products)
        res.render('dashboard/main', { products, showCartPopup: false  })
    }catch(e){

    }
})

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
router.get('/products/:id', async (req, res)=>{
    const { id } = req.params //extracting the id from the params
    const product = await Product.findById(id) //  use that id to find the product
    console.log(product)
    res.render('dashboard/individualProduct', { product, showCartPopup: false })
})
router.get('/products/:id/edit', async (req, res)=>{
    const { id } = req.params
    const product = await Product.findById(id)
    res.render('dashboard/editProduct', { product, showCartPopup: false })
})
router.post('/products/new', upload.single('image'), async (req, res)=>{
    const { name, description, price, foodType} = req.body.Product
    const newPrice = parseFloat(price)
    const newDescription = parseInt(description)
    const ogCategory = await Category.findOne({name: req.body.category})
    console.log(ogCategory, 'Hereeeee is your category')
    const product = new Product({name: name, foodType,  description:newDescription, price: newPrice, date: Date.now()})
    console.log(product, "Product!!!!!!!!")
    product.image = {url: req.file.path, filename: req.file.filename}
    product.category = ogCategory
    await product.save()
    ogCategory.products.push(product)
    await ogCategory.save()
    res.redirect('/products/new')
})
router.put('/product/:id/edit', upload.single('image'), async (req , res)=>{
    const { name, description, price, foodType} = req.body.Product
    const newPrice = parseFloat(price)
    const newDescription = parseInt(description)
    const { id } = req.params 
    const product = await Product.findByIdAndUpdate(id, {name, foodType, description: newDescription, price: newPrice, image: {url: req.file.path, filename: req.file.filename}, date: Date.now() })
    console.log(product)
    res.redirect(`/products/${product._id}`)
})


router.delete('/product/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).send('Product not found');
    }

    await cloudinary.uploader.destroy(product.image.filename); // Correct method for Cloudinary

    await Product.findByIdAndDelete(id); // Correct method for deleting a product

    console.log(product);
    res.redirect('/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while deleting the product');
  }
});

module.exports = router;



module.exports = router