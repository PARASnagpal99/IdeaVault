const express = require('express');
const app = express();
const ideas = require('./data/Ideas');
const connectDB = require('./config/db');
const userRoutes  = require('./routes/userRoutes');
const dotenv = require('dotenv');
const {notFound , errorHandler} = require('./middlewares/errorMiddleware');
dotenv.config();
connectDB();


// Middleware 
app.use(express.json());
app.use('/api/users',userRoutes);


app.get("/", (req, res) => {
    res.send("API is running..");
  });

app.get('/api/ideas',(req,res)=>{
   // console.log(ideas);
    res.json(ideas);
})

 app.use(notFound);
 app.use(errorHandler);

const port = process.env.PORT ;
app.listen(port, () => console.log(`server is running on port ${port}`));
