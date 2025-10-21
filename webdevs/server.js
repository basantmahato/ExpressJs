const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs')


const logger = (req , res, next) =>{
    console.log(req.originalUrl)
    next()

}

app.use(logger)



app.get('/', (req, res) => {
  res.json({
    "message": "Hello from server!",
    "status": "Running"
  });
});


const userRouter = require('./routes/users')

app.use('/users', userRouter)

const statusRouter = require ('./routes/status')

app.use('/status',statusRouter)






app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
