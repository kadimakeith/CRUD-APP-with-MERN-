const express = require('express');
const mongoose = require('mongoose'); 
const Food = require('./Models/food');
const cors = require('cors');
const app = express();

const FoodModel = require('./Models/food') 
const PORT = process.env.PORT || 3001; 

app.use(express.json())
app.use(cors())

mongoose.connect( process.env.MONGODB_URI || 'mongodb+srv://kadimak:playstation23@crud.1x566.mongodb.net/food?retryWrites=true&w=majority', {
    useNewUrlParser: true,
} )

app.post('/insert' , async (req , res) => {
    const foodName = req.body.foodName;
    const days = req.body.days;
    const Food = new FoodModel({ foodName: foodName, daysSinceIAte: days})

    try{
        await Food.save();
    } catch (err) {
        console.log(err)
    }
});

app.get('/read' , async (req , res) => {
    FoodModel.find({}, (err, result) => {
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