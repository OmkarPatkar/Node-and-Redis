const redis = require('redis');
const publisher = redis.createClient();
const Redis = require('ioredis');
const redisClient = new Redis();

// check if redis is connected and running
redisClient.on('connect', () => {
  console.log('Connected!'); // Connected!
});

publisher.on('error', (err) => {
  console.log('Error connecting to Redis:', err);
});

// create channels to publish messages
const channel1 = 'status1'

// function to publish messages
async function publish() {
	console.log(`Started ${ channel1} channel publisher...`);
	redisClient.publish(channel1, 'yooo, subscribers!');
}

// running function
publish();
