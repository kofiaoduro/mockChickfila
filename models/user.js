const mongoose = require('mongoose')
const Schema = mongoose.Schema
const  passportLocalMongoose = require('passport-local-mongoose')


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

const userSchema = new Schema({})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('user', userSchema)

module.exports = User

