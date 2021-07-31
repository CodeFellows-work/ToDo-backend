'use strict';

const express = require('express');
const base64 = require('base-64');
const cors = require('cors');

const { todos, users, db } = require('./lib/models/index.js');


const app = express();
app.use(express.json());
app.use(cors);

app.get('/todos', async (req, res) => {
  let rows = await todos.findAll();
  res.json(rows);
});

app.post('/todos', (req, res) => {

});

app.put('/todos/:id', (req, res) => {

});

app.delete('./todos/:id', (req, res) => {

});

app.post('/signup', async (req, res) => {
    let {username, password} = req.body;
    console.log('console.log from /signup post');
    let user = await users.create({username, password});
    res.json({user, token: user.token}); 
});

app.post('/signin', async (req, res) => {
    let encodedCreds = req.headers.authorization.split(' ')[1];
    let decodedCreds = base64.decode(encodedCreds)
    let [username, password] = decodedCreds.split(':');
    let validUser = await users.authenticateBasic(username, password);
    res.json({
        user: validUser,
        token: validUser.token
    });
});


module.exports = {
    app: app,
    start:(port) => {
        app.listen(port, () => {
            console.log(`Server is up on ${port}`);
        })
    }
}