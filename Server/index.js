const express = require('express');
const mongoose = require('mongoose'); 
const contact = require('./Models/Contact.js');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001; 

app.use(express.json())
app.use(cors())

mongoose.connect( process.env.MONGODB_URI || 'mongodb+srv://kadimak:playstation23@crud.1x566.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
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

app.get('/read' , async (req , res) => {
    contact.find({}, (err, result) => {
        if(err){
            res.send(err)
        }
        res.send(result)
    })
});

if (process.env.NODE_ENV === 'production') {

}

app.listen(PORT, () => {
    console.log(`Server up and running at port ${PORT}`)
} )