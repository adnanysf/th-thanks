require('dotenv').config();
const express = require('express'); 
const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require('mongoose')
const cors = require('cors')
const User = require('./models/User');
const Thank = require('./models/ThankCount');
const uri = process.env.MONGODB_URI;
  
const app = express(); 
app.use(express.json())
app.use(cors())
const PORT = process.env.PORT; 

mongoose.connect(uri,{
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("CONNECTED TO MONGODB")
}).catch(console.error)

app.listen(PORT, (error) =>{ 
    if(!error) 
        console.log("Listening on"+ PORT) 
    else 
        console.log("Error: ", error); 
    }
);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.put('/user/:username/:name', async (req, res) => {
    const username = req.params.username;
    const name = req.params.name;
    const message = req.body.message;

    try {
        const user = await User.findOne({ name: username });
        const thank = await Thank.findOne({ name: name });

        if (!user || !thank) {
            return res.status(404).send({ message: 'User not found' });
        }

        const index = user.usersLeft.indexOf(name);
        if (index !== -1) {
            user.usersLeft.splice(index, 1);
            user.postCount += 1;
            await user.save();
        }

        thank.messages.push(message);
        thank.thankCount += 1;
        await thank.save();

        res.send(user);

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

app.get('/user/:username/getuser', async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ name: username });
        const leastThankCount = await User.find({ name: { $in: user.usersLeft } }).sort({ thankCount: 1 }).limit(1).then(users => users[0].thankCount);
        const usersWithLeastThankCount = await User.find({ name: { $in: user.usersLeft }, thankCount: leastThankCount });
        const randomUser = usersWithLeastThankCount[Math.floor(Math.random() * usersWithLeastThankCount.length)];

        if (!randomUser) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(randomUser);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});

app.get('/user/getinfo/:username', async (req, res) => {
    const username = req.params.username;
    try {
        const user = await User.findOne({ name: username });
        if(!user){
            return res.status(404).send({ message: 'User not found' });
        }
        res.send(user);
        
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error' });
    }
});