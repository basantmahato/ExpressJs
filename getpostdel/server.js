const express = require('express');
const cors = require('cors')
const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

let users = []

app.get('/', (req, res)=>{

    res.json(users)

})

app.post('/', (req,res)=>{

    const userInfo = req.body;
       if (userInfo && userInfo.id && userInfo.name && userInfo.roll) {
        users.push(userInfo);
        res.json({ message: "User added", user: userInfo });
    } else {
        res.status(400).json({ error: "Invalid user data" });
    }

})

app.delete('/:id', (req, res) => {

    const id = Number(req.params.id);
    const initialLen = users.length;

    users = users.filter(u => u.id !== id);  

    if (users.length === initialLen) {                  
    return res.status(404).json({ error: 'User not found' });
  }
  res.json({ message: 'User deleted' });              
});



app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

