const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Product = require('../models/product')



 main().catch(err => console.log(err));

async function main() {

        try{
            await mongoose.connect('mongodb://127.0.0.1:27017/chickfilaApp');
            console.log('database connected')
        }
        catch(e){
            console.log(e)
        }
  
}


const categorySchema = new Schema({
    name: {
        type: String,
        enum: ['Breakfast', 'Entrees', 'Salads', 'Sides', 'Kids Meals', 'Treats', 'Beverages', '']
    },
    description:{
        type: String
    },
    image: {
        type:String
    },
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Category = mongoose.model('Category', categorySchema)
module.exports = Category



