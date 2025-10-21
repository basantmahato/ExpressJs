const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{

    res.send("Users List")

})

router.post('/', (req,res)=>{

    res.send("Create User")
    
})

// routing in name route with different methods

router
.route("/:id")
.get((req,res)=>{
    res.send(`Get User with id ${req.params.id}`)

})
.put((req,res)=>{
    res.send(`Update User with id ${req.params.id}`)

})
.delete((req,res)=>{
    res.send(`Delete User with id ${req.params.id}`)

})


router.param("id",(req,res,next,id)=>{

    console.log(id)
    next()

})

module.exports = router;