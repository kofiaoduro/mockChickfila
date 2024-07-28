const mongoose = require('mongoose');
const Category = require('./category');
const Schema = mongoose.Schema

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


const productSchema = new Schema({
    name: {
        type: String
    },
    foodType: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    price: {
        type: Number
    },
    qty: {
        type: Number
    },
    category: {type: Schema.Types.ObjectId, ref: 'Category'}

})

const Product = mongoose.model('Product', productSchema)


module.exports =  Product