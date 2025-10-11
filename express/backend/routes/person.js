
const express = require('express');
const router = express.Router();

const names = ['John', 'Jane', 'Bob'];
const roll = [1, 2, 3];
const course = ['Math', 'Science', 'English'];

router.get('/names', (req, res) => {
  const randomName = names[Math.floor(Math.random() * names.length)];
  res.send(randomName);
});

router.get('/roll', (req, res) => {
  const randomROLL = roll[Math.floor(Math.random() * roll.length)];
  res.send(randomROLL.toString());
});


router.get('/course', (req, res) => {
  const randomCourse = course[Math.floor(Math.random() * course.length)];
  res.send(randomCourse);
});

module.exports = router;  
