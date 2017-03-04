import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import process from 'process';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from './model/user';
import Task from './model/task';

// loads environment variables
// accessing PRIVATE_KEY environment variable
dotenv.load();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

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
  const body = req.body;
  User.findOne({email: body.email}, (err, user) => {
    if (err) {
      console.warn(err);
      res.status(401);
      res.send({err: 'invalid email or password'});
      return;
    }
    bcrypt.compare(body.password, user.password_digest, (err, ok) => {
      if (err || !ok) {
        console.warn(err);
        res.status(401);
        res.send({err: 'invalid email or password'});
        return;
      }
      const payload = ({_id: user._id, name: user.name, email: user.email});
      jwt.sign(payload, PRIVATE_KEY, null, (err, token) => {
        if (err) {
          res.status(500);
          res.send({});
          return;
        }
        res.send({
          user: {_id: user._id, name: user.name, email: user.email},
          token: token
        });
      });
    });
  });
});

// POST /api/users
// creates user in db
// Example request:
// {
//   "name": "Erick", // required,
//   "email": "erick@example.com", // required,
//   "password": "password" // required
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
});


// GET /api/tasks
// retrieves task for user
app.get('/api/tasks', (req, res) => {
  const user_id = 0;
  Task.find({user_id: user_id}, (err, tasks) => {
    if (err) {
      res.send({err: err});
    } else {
      res.send({tasks: tasks});
    }
  });
});

// PUT /api/tasks/:id
// updates a task
app.put('/api/tasks/:id', (req, res) => {
  Task.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, (err, task) => {
    if (err) {
      res.send({err: err});
    } else {
      res.send({task: task});
    }
  });
});

// TEST route works
app.post('/api/test', (req, res) => {
  res.send(req.body);
});

// listen on port for incoming requests
app.listen(3000, () => {
  console.log('server up on 3000');
});
