require('dotenv').config();

const express = require('express');
const app = express();
const port = 3000

app.use(express.json());

app.use('/api/users', require('./route/userRoutes'));

// Serve frontend static files
app.use(express.static('frontend'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

