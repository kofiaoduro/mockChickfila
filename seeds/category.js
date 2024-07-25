const mongoose = require('mongoose')
const  Category  = require('../models/category')



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

createCategory()