const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

name:{
    type: String,
    required: true,  
},
email:{
    type:String,
    required:true,
},
password:{
    type:String,
    required: true,
}

})

const User = mongoose.model('User',userSchema)

module.exports = User;

// after creating a Schema for mongodb now go back to file index.js  and write our 
// first function of crud operation 