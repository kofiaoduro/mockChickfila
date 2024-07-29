const mongoose = require('mongoose');
const Category = require('./category');
const Schema = mongoose.Schema
const dbUrl = process.env.DB_URL

/* main().catch(err => console.log(err));

async function main() {

        try{
            await mongoose.connect('mongodb://127.0.0.1:27017/chickfilaApp');
            console.log('database connected')
        }
        catch(e){
            console.log(e)
        }
  
}
*/

const productSchema = new Schema({
    name: {
        type: String
    },
    foodType: {
        type: String
    },
    description: {
        type: Number
    },
    image: {
        url: String,
        filename: String
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