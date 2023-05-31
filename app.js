const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect('mongodb+srv://<username>:<password>@cluster0.hbhwc24.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true });

const studentSchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    phone: String
  });

  const Student = mongoose.model('Student', studentSchema);




  //   ================================FETCHING SINGLE STUDENT FROM DB======================================


  app.get('/fetch/:id', async function(req, res) {
    try {
      const student = await Student.findById(req.params.id);
      res.send(student);
    } catch (err) {
      res.send(err);
    }
  });

  //   ================================POSTING STUDENT DETILS INTO DB======================================


  app.post('/register', async function(req, res) {
    try {
        const newStudent = new Student(req.body);
        const student = await newStudent.save();
        res.send(student);
    } catch (err) {
        res.send(err);
    }
});
  


  
  app.listen(3000, function() {
    console.log('Server started at port 3000');
  });
  
