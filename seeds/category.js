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
    const category =  await Category.insertMany([{name: 'Breakfast'},  {name: 'Entrees'}, {name: 'Salads'}, {name: 'Sides'}, {name: 'Kids Meals'}, {name: 'Treats'}, {name: 'Beverages'}])
}
