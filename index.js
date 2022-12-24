// first read the detail file for your concept and to understand the whole senario and give me a quickly feedback
// by pressing star 
const express = require("express");
const mongoose = require("mongoose");
const User = require('./src/Models/model')
const app = express();
// by default middleware
app.use(express.json());

// Connecting app to mongodb database 
mongoose.connect("mongodb://0.0.0.0:27017/cruddatabase")
    .then(() => console.log("connected to mongodb"))
    .catch((error) => console.log("couldn't connected to mongodb"));

// now i am going to write a scheme for registration page in models folder 
// ............. 

// schema is created now create post route in other words i am writing my 
// first function of crud operation here 
// method-1: 
app.post('/signup', async (req, res) => {
    const payload = req.body;
    const { error } = User(payload);
    if (error) {
        return res.status(400).send({ message: error.details[0].message })
    }
    let user = new User(payload);
    user = await user.save();
    res.status(200).send({ user });
})

// alternate Method-2 : 
// app.post('/signup', async (req,res) => {
//     let {name,email,password} = req.body 

//     try{
//         let user = new User({
//             name,
//             email,
//             password
//         })
//        let createdUser = await user.save() 
//        res.status(201).json({
//         status : 'Success',
//         data : {
//             createdUser
//         }
//     })
//     }catch(err){
//         console.log(err)
//     }
// })
//  ======================>>>>>>>>
// create a get route 
app.get("/",async (req,res)=>{
    const users = await User.find();
    res.status(200).send(users)
})

// Now Create a Update Route 
app.patch('/:userId', async (req,res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId,req.body,{
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Success',
            data : {
              updatedUser
            }
          })
    }catch(err){
        console.log(err)
    }
})

// now create a delete route 

app.delete('/:userId', async (req,res) => {
    const id = req.params.userId
    await User.findByIdAndRemove(id).exec()
    res.send('Deleted')
})

// our app will listen on this server port number     
app.listen(5000, () => console.log("server is running"));