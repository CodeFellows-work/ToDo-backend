'use strict';

const server = require('../lib/server.js');
const supertest = require('supertest');
const { db } = require('../lib/models/index.js');

const request = supertest(server.app);


beforeAll(async () => {
    await db.sync();
    await db.models.Todos.create({name: 'test'});
});
afterAll(async () => {
    await db.drop();
});

describe('Testing server CRUD for todos', ()=> {

    it('Should be able to read READ todos at /todos', async ()=>{
        let response = await request.get('/todos');

        expect(response.body).toBeTruthy();
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });

    it('Should be able to CREATE todos at /todos', async () => {
        let response = await request.post('/todos');
        expect(response.status).toBe(200);
      });

    it('Should be able to UPDATE todos at /todos/:id', async () => {
        let response = await request.put('/todos/');
    });

    it('Should be able to DELETE todos at /todos/:id', async () => {
        let response = await request.delete('/todos/')
    });



    it('Testing signup user', async () => {
        let response = await request.post('/signup').send({
            username: 'sunny',
            password: 'password'
        });
        // console.log('LALALALALALALA RESPONSE DATA ', response.request._data);
        expect(response.body.user.username).toEqual('sunny')
    });

    it('testing logging in user', async () => {
        let response = await request.post('/signin').auth('sunny', 'password');
        // console.log(response.body.user.username);
        expect(response.body.user.username).toEqual('sunny');
        
    });
});
