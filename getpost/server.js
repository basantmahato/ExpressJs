const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());    
const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/personDB';


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  }
});


const Person = mongoose.model('Person', personSchema);

mongoose.connect(dbURI)
  .then(() => {
    console.log('Connected to MongoDB!');

    app.listen(5000, () => {
      console.log('Server started on port 5000');
    });
  })
  .catch((err) => console.log('MongoDB connection error:', err));



let personsdb = [];
app.get('/', (req, res) => {
  res.send('Server running...');
});


// app.get('/person', (req, res) => {
//   res.json(personsdb);
  
// })

app.get('/person', async (req, res) => {
    try {
        const persons = await Person.find({});
        res.json(persons);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch persons', error: error.message });
    }
});


app.post('/person', async (req, res) => { 
  const {name,age} = req.body;

  if (!name || !age) {
    return res.status(400).json({ message: 'Name and age are required' });
  }

  try {
   
    const newPerson = await Person.create({ name, age });

   
    res.json({ message: 'Person saved successfully', person: newPerson });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save person to database', error: error.message });
  }
});



// app.post('/person', (req, res) => {

//   const {name,age} = req.body;

//     if (!name || !age) {
//     return res.status(400).json({ message: 'Name and age are required' });
//   }

//   personsdb.push({name, age});

//   res.json({ message: 'Person saved successfully' });



// })
// app.listen(5000, () => {
//   console.log('Server started on port 5000');
// });
