const mongoose = require('mongoose') ;

const connectDB = async() => {
    try { 
        const conn = await mongoose.connect(process.env.URI_STRING,{
        useNewUrlParser : true ,
        useUnifiedTopology : true 
       })
       //console.log(conn)
       console.log('DB Connected');
    }catch(err){
        console.log(`Error : ${err.message}`.red);
        process.exit(1);
    }
}

module.exports = connectDB ;