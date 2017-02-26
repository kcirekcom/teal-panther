import express from 'express';
import mongoose from 'mongoose';
import process from 'process';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import User from './model/user';

const router = express.Router();

// jsonMiddleware populates the request
// body after parsing it
const jsonMiddleware = bodyParser.json();

// connect to the db
// will buffer operations
mongoose.connect('mongodb://localhost/tealpanther_dev', null, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

const app = express();

// always use to parse incoming requests
app.use(jsonMiddleware);

// POST /api/login
// Authenticates a user and returns a JWT token and current user's info
app.post('/api/login', (req, res) => {


});

// POST /api/users
// creates user in db
// Example request:
// {
//   name: "Erick", // required,
//   email: "erick@example.com", // required,
//   password_digest: "password" // required
// }
app.post('/api/users', (req, res) => {
  const body = req.body;

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(body.password, salt);

  const user = new User(req.body);
  user.password_digest = hash;
  user.save((err) => {
    if (err) {
      res.send({err: err});
    } else {
      res.send({user: user});
    }
  });

});

// POST /api/tasks
// creates task for user
app.post('/api/tasks', (req, res) => {
  const task = new Task(req.body);
  task.save((err) => {
    if (err) {
      res.send({err: err});
    } else {
      res.send({task: task});
    }
});


// GET /api/tasks
// gets task for user
app.get('/api/tasks', (req, res) => {


});

// PUT /api/tasks/:id
// updates a task
app.put('/api/tasks/:id', (req, res) => {


});

// listen on port for incoming requests
app.listen(3000, () => {
  console.log('server up on 3000');
});
