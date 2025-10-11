const express = require('express');
const app = express();
const port = 3000;

const personRoutes = require('../routes/person.js');

app.use('/person', personRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
