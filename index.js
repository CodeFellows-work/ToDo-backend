'use strict';

const { db } = require('./lib/models/index.js');
const server = require('./server.js');


    db.sync()
        .then(() => {
            server.start(process.env.PORT || 3000);
        })