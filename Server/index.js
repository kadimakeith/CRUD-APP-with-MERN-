const express = require('express');
const mongoose = require('mongoose'); 
const contact = require('./Models/Contact.js');
const cors = require('cors');
const app = express();
require('dotenv').config(); 

const PORT = process.env.PORT || 3001; 

app.use(express.json())
app.use(cors())

mongoose.connect( process.env.MONGODB_URI || 'mongodb+srv://kadimak:playstation23@crud.1x566.mongodb.net/Contacts?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology:true,
} )

app.post('/insert' , async (req , res) => {
    const name = req.body.Name;
    const email = req.body.Email;
    const country = req.body.Country;
    const cont = new contact({ Name: name, Country: country, Email: email})

    try{
        await cont.save();
       } catch (err) {
        console.log(err)
    }
});

app.put('/updateName' , async (req , res) => {
    const newname = req.body.newName;
    const nameId = req.body.id;
    

    try{
        await contact.findById(nameId, (err, updatedName) =>{
            updatedName.Name = newname;
            updatedName.save(); 
            res.send('updated')
        })
       } catch (err) {
        console.log(err)
    }
});

app.put('/updateMail' , async (req , res) => {
    const newMail = req.body.newMail;
    const nameId = req.body.id;
    

    try{
        await contact.findById(nameId, (err, updatedMail) =>{
            updatedMail.Email = newMail;
            updatedMail.save(); 
            res.send('updated')
        })
       } catch (err) {
        console.log(err)
    }
});

app.put('/updateCountry' , async (req , res) => {
    const newCountry = req.body.newCountry;
    const nameId = req.body.id;
    

    try{
        await contact.findById(nameId, (err, updatedCountry) =>{
            updatedCountry.Country = newCountry;
            updatedCountry.save(); 
            res.send('updated')
        })
       } catch (err) {
        console.log(err)
    }
});

app.delete('/delete/:id' , async(req, res) =>{
    const id = req.params.id

    await contact.findByIdAndRemove(id).exec();
    res.send('deleted')
})

app.get('/read' , async (req , res) => {
    contact.find({}, (err, result) => {
        if(err){
            res.send(err)
        }
        res.send(result)
    })
});


app.listen(PORT, () => {
    console.log(`Server up and running at port ${PORT}`)
} )