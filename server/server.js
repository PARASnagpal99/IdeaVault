const express = require('express');
const app = express();
const ideas = require('./data/Ideas');
const dotenv = require('dotenv');
dotenv.config();

app.get('/',(req , res) =>{
    res.send('hello world');
})

app.get('/api/ideas',(req,res) =>{
    res.json(ideas);
})

app.get('/api/idea/:id',(req,res) =>{
    const id = req.params.id ;
    const idea = ideas.find((idea) => idea._id === id);
    res.send(idea);
})


const port = process.env.PORT ;
app.listen(port, () => console.log(`server is running on port ${port}`));