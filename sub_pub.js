const Redis = require('ioredis');

// create iclaients for pub and sub
const pub = new Redis();
const sub = new Redis();

// subscribe to a channel
sub.subscribe('chat');

// Receive message from channel
sub.on('message', (channel, message) => {
	  console.log(`Received message from channel '${channel}': ${message}`); 
});

// publish message on channel
pub.publish('chat', 'Hello, subscriber!');

// set timeout
setTimeout(() => {
	pub.quit();
	sub.quit();
}, 2000);