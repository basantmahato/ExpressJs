const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use(cors());

let feedbacks = [];


app.post('/feedback', (req, res) => {
  const feedback = req.body;

  if (!feedback.name || !feedback.email || !feedback.message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  feedbacks.push(feedback);

  

  console.log('New Feedback:', feedback);
  res.json({ message: 'Feedback received successfully!' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
