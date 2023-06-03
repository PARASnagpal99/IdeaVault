const express = require('express');
const app = express();
const notes = require('./data/notes')
const dotenv = require('dotenv');
dotenv.config();

app.get('/',(req , res) =>{
    res.send('hello world');
})

app.get('/api/notes',(req,res) =>{
    res.json(notes);
})

app.get('/api/notes/:id',(req,res) =>{
    const id = req.params.id ;
    const note = notes.find((n) => n._id === id);
    res.send(note);
})


const port = process.env.PORT ;
app.listen(port, () => console.log(`server is running on port ${port}`));