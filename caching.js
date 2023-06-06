const redis = require('redis');
const client = redis.createClient();
const axios = require('axios');
const express = require('express');
const app = express();
const Redis = require('ioredis'); // Import the ioredis package

client.on('connect', () => {
  console.log('Connected to Redis');
});

client.on('error', (err) => {
  console.log('Error connecting to Redis:', err);
});

const USERS_API = 'https://jsonplaceholder.typicode.com/users/';

app.get('/users', (req, res) => {

  try {
    axios.get(`${USERS_API}`).then(function (response) {
      const users = response.data;
      console.log('Users retrieved from the API');
      res.status(200).send(users);
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});



app.get('/cached-users', (req, res) => {

  console.log("cached-users api")
  try {
    const redisClient = new Redis();
    redisClient.get('users', (err, data) => {

      if (err) {
        console.error("ERROR : " + err);
        throw err;
      }

      if (data) {
        console.log('Users retrieved from Redis (cached-users)');
        res.status(200).send(JSON.parse(data));
      } else {
        axios.get(`${USERS_API}`).then(function (response) {
          const users = response.data;
          redisClient.setex('users', 600, JSON.stringify(users));
          console.log('Users retrieved from the API inside cached-users');
          res.status(200).send(users);
        });
      }
    });
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at port: ${PORT}`);
});