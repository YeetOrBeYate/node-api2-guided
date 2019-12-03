const express = require('express');
const Hubs = require('../hubs/hubs-model');
const HubsRouter = express.Router();

HubsRouter.get('/', (req, res) => {
    
    Hubs.find(req.query)
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hubs',
      });
    });
  });
  
  HubsRouter.get('/:id', (req, res) => {
    console.log(req.query)
    Hubs.findById(req.params.id)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'Hub not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the hub',
      });
    });
  });
  
  HubsRouter.post('/', (req, res) => {
    
    Hubs.add(req.body)
    .then(hub => {
      res.status(201).json(hub);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
  });
  
  HubsRouter.delete('/:id', (req, res) => {
    Hubs.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The hub has been nuked' });
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error removing the hub',
      });
    });
  });
  
  HubsRouter.put('/:id', (req, res) => {
    const changes = req.body;
    Hubs.update(req.params.id, changes)
    .then(hub => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: 'The hub could not be found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the hub',
      });
    });
  });
// add an endpoint that returns all the messages for a hub
  HubsRouter.get("/:id/messages", (req,res)=>{
      Hubs.findHubMessages(req.params.id)
      .then(messages=>{
          res.status(200).json(messages);
      })
      .catch(err=>{
          res.status(500).json({message: "error getting hubs message"})
      })
  })

// add an endpoint for adding new message to a hub
  HubsRouter.post("/:id/messages", (req,res)=>{
    Hubs.addMessage(req.body)
    .then(message=>{
        res.status(200).json(message);
    })
    .catch(err=>{
        res.status(500).json({message: "error getting hubs message"})
    })
})






module.exports = HubsRouter;