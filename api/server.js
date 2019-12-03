const express = require('express');

const HubsRouter = require('../Routers/Hubs')



const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

//when ever you visit api/hubs, use this router
server.use('/api/hubs', HubsRouter);





// add an endpoint that returns all the messages for a hub
// add an endpoint for adding new message to a hub

module.exports = server;