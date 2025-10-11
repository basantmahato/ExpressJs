const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/person');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// POST route to save a person
app.post('/person', async(req, res) => {

try {

  const data = req.body;

  const newPerson = new Person(data);
  const response = await newPerson.save();
  console.log('✅ Person saved:', response);
  res.status(200).json(response);

} catch (error) {
  console.error('❌ Error saving person:', error);
  res.status(500).json({ error: 'Error saving person' });
}

});


app.get('/db', async(req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    console.error('❌ Error fetching people:', error);
    res.status(500).json({ error: 'Error fetching people' });
  }
});

// Start server
app.listen(3000, () => {
  console.log('🚀 Server is running on port 3000');
});
