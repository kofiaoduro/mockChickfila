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

const imageSchema = new Schema({
    url: String,
    filename: String,
    _id: false
  })
  imageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload', '/upload/w_600,c_fill,q_auto:best')
})

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
    image: imageSchema,
    price: {
        type: Number
    },
    qty: {
        type: Number
    },
   date: {
        type: Date,
    },
    category: {type: Schema.Types.ObjectId, ref: 'Category'}

})

const Product = mongoose.model('Product', productSchema)


module.exports =  Product