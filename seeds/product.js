const mongoose = require('mongoose')
const Product = require('../models/product')
const Category = require('../models/category')
async function main() {

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/chickfilaApp');
        console.log('database connected')
    }
    catch(e){
        console.log(e)
    }

}

const insertProduct = async ()=>{
   await Product.deleteMany()
   await Product.insertMany([{
    name: 'Big Classic',
    foodType: 'entree',
    description: '860 Cal',
    image: 'entree1.jpg',
    price: 8.99,
   },{
        name: 'Turkey Sandwhich',
        foodType: 'entree',
        description: '300 Cal',
        image: 'entree2.jpg',
        price: 3.50
   },
{
    name: 'Deluxe Turkey Sandwhich',
    foodType: 'entree',
    description: '490 Cal',
    image: 'entree3.jpg',
    price: 5.60
},
{
    name: 'Pretzel Sandwhich',
    foodType: 'entree',
    description: '1,050 Cal',
    image: 'entree4.jpg',
    price: 8.90
}])
}





const findProducts = async ()=>{
    const entree = await Category.findOne({name: 'Entrees'})
    console.log(entree)
    const product = await Product.find({foodType: 'entree',})
    product.map((prod)=>{
        prod.category = entree
        prod.save()
    })
}



// add products\
const breakfast = async ()=>{
    Product.insertMany([
        //breakfast
        {
            name: 'Toast With Egg',
            foodType: 'breakfast',
            description: '290 Cal',
            image: 'breakfast1.jpg',
            price: 3.90
        },
        {
            name: 'All Star Toast',
            foodType: 'breakfast',
            description: '310 Cal',
            image: 'breakfast3.jpg',
            price: 4.90
        },
        {
            name: 'Waffles',
            foodType: 'breakfast',
            description: '590 Cal',
            image: 'breakfast4.jpg',
            price: 2.90
        },
        {
            name: 'French Toast',
            foodType: 'breakfast',
            description: '1190 Cal',
            image: 'breakfast5.jpg',
            price: 10.90
        },
        //salad products
        {
            name: 'Cobb Salad',
            foodType: 'salad',
            description: '830 Cal',
            image: 'salad1.jpg',
            price: 3.90
        },
        {
            name: 'Market Salad',
            foodType: 'salad',
            description: '550 Cal',
            image: 'salad1.jpg',
            price: 8.90
        },
        {
            name: 'Southwest Salad',
            foodType: 'salad',
            description: '830 Cal',
            image: 'salad3.jpg',
            price: 7.90
        },
        //sides products
        {
            name: 'Peach Fruit Bowl',
            foodType: 'sides',
            description: '390 Cal',
            image: 'fruit1.jpg',
            price: 4.90
        },
        {
            name: 'Fruit Cup',
            foodType: 'sides',
            description: '70 Cal',
            image: 'fruit2.jpg',
            price: 2.90
        },
        {
            name: 'All Star Fruit Bowl',
            foodType: 'sides',
            description: '490 Cal',
            image: 'fruit4.jpg',
            price: 6.90
        },
        //beverages
        {
            name: 'Sunjoy Sweet Tea',
            foodType: 'bev',
            description: '190 Cal',
            image: 'drink1.jpg',
            price: 1.90
        },
        {
            name: 'Chick-fil-A Lemonade',
            foodType: 'bev',
            description: '60 Cal',
            image: 'drink2.jpg',
            price: 1.90
        },
        {
            name: 'Chick-fil-A Diet Lemonade',
            foodType: 'bev',
            description: '60 Cal',
            image: 'drink3.jpg',
            price: 1.20
        },
        {
            name: 'All Star Sunjoy Sweet Tea',
            foodType: 'bev',
            description: '190 Cal',
            image: 'drink7.jpg',
            price: 2.40
        }
    ])
}

