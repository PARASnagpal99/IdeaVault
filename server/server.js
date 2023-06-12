const express = require('express');
const app = express();
const ideas = require('./data/Ideas');
const connectDB = require('./config/db');
const userRoutes  = require('./routes/userRoutes');
const ideaRoutes  = require('./routes/ideaRoutes');
const dotenv = require('dotenv');
const {notFound , errorHandler} = require('./middlewares/errorMiddleware');
dotenv.config();
connectDB();


// Middleware 
app.use(express.json());
app.use('/api/users',userRoutes);
app.use('/api/ideas',ideaRoutes);

app.get("/", (req, res) => {
    res.send("API is running..");
  });

  
 // This must be the last route because it will deal with all the errors thrown by asyncHandler
 app.use(notFound);
 app.use(errorHandler);

// Setting up the server 
const port = process.env.PORT ;
app.listen(port, () => console.log(`server is running on port ${port}`));
