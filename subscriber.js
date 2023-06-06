const redis = require('redis');
const subscriber = redis.createClient();
const Redis = require('ioredis');
const redisClient = new Redis();

// check if redis is connected and running
subscriber.on('connect', function() {
console.log('Connected!'); // Connected!
});

// create channels to subscribe to
const channel1 = 'chat1';
const channel2 = 'chat2'; // Add additional channel

// subscribe to channels
redisClient.subscribe(channel1, (err, channel) => {
	if (err) {
		throw new Error(err);
	}
	console.log(`Subscribed to ${channel1} channel. Listening for updates on the ${channel1} channel...`);

});

redisClient.subscribe(channel2, (err, channel) => {
	if (err) {
		throw new Error(err);
	}
	console.log(`Subscribed to ${channel2} channel. Listening for updates on the ${channel2} channel...`);

});

// Receive message from channels
redisClient.on('message', (channel, message) => {
	if (channel === channel1) {
		console.log(`Received message from ${channel1} channel: ${message}`);
	} else if (channel === channel2) {
		console.log(`Received message from ${channel2} channel: ${message}`);
}
});

