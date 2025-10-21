const express = require('express');
const router = express.Router();

router.get('/500', (req,res)=>{
    res.sendStatus(500)
})

router.get('/404', (req,res)=>{
    res.status(404).send("Page not found")

})

router.get('/render', (req,res)=>{
    res.render('index', {text : "❌"})
})


router.get('/download', (req , res)=>{
    res.download('./file.txt')
})


module.exports = router;


