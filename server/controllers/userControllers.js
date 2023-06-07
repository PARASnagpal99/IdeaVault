const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generatetoken');

const registerUser = asyncHandler(async(req,res)=>{
      const {name,email,password,picture} = req.body ;
      const userExists = await User.findOne({email}).exec();

      if(userExists){
         res.status(400);
         throw new Error('User Already exists');
      }

      const user = await User.create({
        name , 
        email , 
        password ,
        picture ,
      })

      if(user){
        res.status(201).json({
            _id : user._id ,
            name : user.name ,
            email : user.email ,
            picture : user.picture , 
            token : generateToken(user._id)
        })
      }else{
        res.status(400);
        throw new Error('User Not Created , Invalid User Data');
      }
      
})

const loginUser = asyncHandler(async(req,res)=>{
  const {email,password} = req.body ;
  
  const user = await User.findOne({email}).exec() ;

  if(user && (await user.matchPassword(password))){
    res.json({
      _id : user._id ,
      name : user.name ,
      email : user.email ,
      picture : user.picture ,
      token : generateToken(user._id)
    })
  }else{
    res.status(401);
    throw new Error('Invalid Email or Password');
  }
})



module.exports = {registerUser,loginUser};