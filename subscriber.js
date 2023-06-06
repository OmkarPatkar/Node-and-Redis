const redis = require('redis');
const subscriber = redis.createClient();
const Redis = require('ioredis');
const redisClient = new Redis();

// check if redis is connected and running
subscriber.on('connect', function() {
  console.log('Connected!'); // Connected!
});

// create channels to subscribe to

const channel1 = 'status1';

// subscribe to channels
redisClient.subscribe(channel1, (err, channel) => {
	if (err) {
		throw new Error(err);
	}
	console.log(`subscribed to ${channel1} channel. Listening for updates on the ${channel1} channel...`);
});

// Receive message from channels
redisClient.on('message', (channel, message) => {
	console.log(`Received message from ${channel1} channel: ${message}`);
});