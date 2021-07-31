'use strict';

const express = require('express');
const base64 = require('base-64');




const { todos, users, db } = require('./lib/models/index.js');



const app = express();

app.use(express.json());



app.get('/:todos', async (req, res) => {
  let rows = await todos.findAll();
  res.json(rows);
});


app.post('/todos', handleCreate);

app.put('/:todos/:id', (req, res) => {

});

app.delete('/:todos/:id', (req, res) => {

});

async function handleCreate(req, res) {
    let obj = req.body;
    let records  = await req.todos.create(obj);
    res.status(200).json(records);
}

app.post('/signup', async (req, res) => {
    let {username, password} = req.body;
    console.log('console.log from /signup post');

    let user =  await users.create({username, password});
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

app.get('/users', async (req, res) => {
    const userRecords = await users.findAll({});
    const list = userRecords.map(user => user.username);
    res.status(200).json(list);
})

module.exports = {
    app: app,
    start:(port) => {
        app.listen(port, () => {
            console.log(`Server is up on ${port}`);
        })
    }
}