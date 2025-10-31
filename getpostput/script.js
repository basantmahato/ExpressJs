const express = require('express');
const app = express();

app.use(express.json()); // To read JSON body

let users = [
  { rollNo: 1, name: "Basant" },
  { rollNo: 2, name: "Aman" }
];

// ✅ GET: Fetch all users
app.get('/users', (req, res) => {
  res.json({
    message: "All users fetched successfully",
    data: users
  });
});

// ✅ POST: Add a new user
app.post('/users', (req, res) => {
  const { rollNo, name } = req.body;

  // check rollNo exist or not
  const exists = users.find(user => user.rollNo === rollNo);
  if (exists) {
    return res.status(400).json({ message: "Roll No already exists" });
  }

  users.push({ rollNo, name });
  res.status(201).json({
    message: "User added successfully",
    data: { rollNo, name }
  });
});

// ✅ PUT: Update existing user by rollNo
app.put('/users/:rollNo', (req, res) => {
  const rollNo = parseInt(req.params.rollNo);
  const { name } = req.body;

  const index = users.findIndex(user => user.rollNo === rollNo);
  if (index === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[index].name = name;
  res.json({
    message: "User updated successfully",
    data: users[index]
  });
});

// ✅ Server Listen
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
