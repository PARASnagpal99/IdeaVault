const Idea = require('../models/idea');
const asyncHandler = require('express-async-handler');

const getIdeas = asyncHandler(async (req, res) => {
       const ideas = await Idea.find({user : req.user._id}) ;
       res.json(ideas);
})

const createIdea = asyncHandler(async(req,res)=>{
      const {title , content , category} = req.body ;
      
      if(!title || !content || !category){
         res.status(400);
         throw new Error('Please fill all the fields');
      }else{
        const idea = new Idea({user : req.user._id , title , content , category});
        const createdIdea = await idea.save();
        res.status(201).json(createdIdea);
      }
})

const getIdeaById = asyncHandler(async(req,res)=>{
      const id = req.params.id ;
      const idea = await Idea.findById(id);
      if(idea){
         res.status(200).json(idea);
      }else{
        res.status(404).json({message : 'Idea Not Found'});
      }
})


const updateIdea = asyncHandler(async(req,res)=>{
      const {title , content , category} = req.body ;
      const idea = await Idea.findById(req.params.id);

      if(!idea){
        res.status(401);
        throw new Error('Idea Not Found');
      }

      if(idea.user.toString() !== req.user._id.toString()){
         res.status(401);
         throw new Error('You are not authorized to update this idea');
      }

         idea.title = title ;
         idea.content = content ;
         idea.category = category ;
         const updatedIdea = await idea.save();
         res.status(200).json(updatedIdea);

})

const deleteIdea = asyncHandler(async(req,res)=>{
      const idea = await Idea.findById(req.params.id);

      if(!idea){
        res.status(401);
        throw new Error('Idea Not Found');
      }

      if(idea.user.toString() !== req.user._id.toString()){
         res.status(401);
         throw new Error('You are not authorized to delete this idea');
      }

        await Idea.findOneAndDelete({_id : req.params.id});
        res.status(200).json({message : 'Idea Deleted'});
})


module.exports = {getIdeas,createIdea,getIdeaById,updateIdea,deleteIdea};