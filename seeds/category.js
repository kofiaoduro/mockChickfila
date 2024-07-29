const mongoose = require('mongoose')
const  Category  = require('../models/category')
const Product = require('../models/product')
const dbUrl = process.env.DB_URL

async function main() {

    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/chickfilaApp');
        console.log('database connected')
    }
    catch(e){
        console.log(e)
    }

}

 const createCategory = async ()=>{
    await Category.deleteMany()
    const category =  await Category.insertMany([{name: 'Breakfast', image: 'breakfast1.jpg', description: 'Chicken for breakfast? Yes, please. If youve only visited us for lunch or dinner, youre missing our Hashbrowns, Burritos, Berry Parfait and more.'},  {name: 'Entrees', image: 'entree1.jpg', description: 'From our classic Chick-fil-A® Chicken Sandwich to our new subtly sweet Maple Pepper Bacon Sandwich, we have something for everyone.'}, {name: 'Salads', image: 'salad1.jpg', description: 'Go green with these options, prepared fresh daily, and perk them up with our variety of dressings.'}, {name: 'Sides', image: 'side1.jpg', description: 'An entrée without a side is like a day without sunshine. Whether you choose an old favorite like Waffle Fries or mix it up with something new, make it a meal by adding a side.'}, {name: 'Kids Meals', image: 'side2.jpg', description: "From Grilled Nuggets to Fruit Cups, we have several options for our youngest guests."}, {name: 'Treats', image: 'fruit1.jpg', description: 'You deserve a little something sweet. How does a Chocolate Chunk Cookie, Fudge Brownie, or Milkshake sound?'}, {name: 'Beverages', image: 'drink1.jpg', description: 'Satisfy your thirst with a Sunjoy®, Lemonade, Iced Tea and more.'}])
}




/* const getCategory = async ()=>{
    const entree = await Category.findOne({name: 'Entrees'})
    const products = await Product.find({foodType: 'entree'});
    entree.products = products
    console.log(entree)
    await entree.save()
}


 const validateProducts = async () => {
    try {
        const entree = await Category.findOne({ name: 'Entrees' }).populate('products');
        return entree;
    } catch (error) {
        console.error('Error validating products:', error);
        throw error; // Ensure error is propagated for the .catch block
    }
};
*/
/* validateProducts()
    .then((data) => {
        console.log('Category with products:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

*/

//First part of the code was me testing ou how to refrence the category with products
// Did this by Associating Entrees category with its products that have entrees in their food type

// Salad Category

/* const getCategory = async ()=>{
    const salad = await Category.findOne({name: 'Salads'})
    const products = await Product.find({foodType: 'salad'});
    salad.products = products
    console.log(salad)
    await salad.save()
}
*/

// bevaerage Category

/* const getCategory = async ()=>{
    const beverage = await Category.findOne({name: 'Beverages'})
    const products = await Product.find({foodType: 'bev'});
    beverage.products = products
    console.log(beverage)
    await beverage.save()

}
*/

//sides Category

 /* const getCategory = async ()=>{
    const sides = await Category.findOne({name: 'Sides'})
    const products = await Product.find({foodType: 'sides'});
    sides.products = products
    console.log(sides)
    await sides.save()

}
*/

/*breakfast Category
const getCategory = async ()=>{
    const breakfast = await Category.findOne({name: 'Breakfast'})
    const products = await Product.find({foodType: 'breakfast'});
    breakfast.products = products
    console.log(breakfast)
    await breakfast.save()
}
*/
//Treats Category
const getCategory = async ()=>{
    const treats = await Category.findOne({name: 'Treats'})
    const products = await Product.find({foodType: 'treats'});
    treats.products = products
    console.log(treats)
    await treats.save()
}

