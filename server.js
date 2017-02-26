import * as express from 'express';
import * as mongoose from 'mongoose';
import process from 'process';

// connect to the db
// will buffer operations
mongoose.connect('mongodb//localhost/tealpanther_dev', null, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
});

const app = express();

// POST /api/login
// Authenticates a user and returns a JWT token and current user's info
app.post('/api/login', (req, res) => {


});

// POST /api/users
// creates user in db
app.post('/api/users', (req, res) => {


});

// POST /api/tasks
// creates task for user
app.post('/api/tasks', (req, res) => {


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
