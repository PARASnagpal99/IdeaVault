const mongoose = require('mongoose') ;

const ideaSchema = new mongoose.Schema({
    title : {
        type : String , 
        required : true ,
    } ,
    content : {
        type : String , 
        required : true ,
    } ,
    category : {
        type : String ,
        required : true , 
    } ,
    user : {
        type : mongoose.Schema.Types.ObjectId ,
        required : true ,
        ref : 'User' ,
    },
},
{
    timestamps : true 
}
)

const Idea = mongoose.model('Idea',ideaSchema);
module.exports = Idea ;