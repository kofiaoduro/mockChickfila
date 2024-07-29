const mongoose = require('mongoose')
const Product = require('../models/product')
const Schema = mongoose.Schema

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
cartSchema = new Schema({
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}]
})


const Cart = mongoose.model('Cart', cartSchema)


module.exports = Cart