const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');



dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/users', userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT}`);
});
