const redis = require('redis');
const client = redis.createClient();
const Redis = require('ioredis');
const redisClient = new Redis();

client.on('connect', function() {
  console.log('Connected!'); // Connected!
});

// Strings

redisClient.set('framework', 'ReactJS', function(err, reply) {
  console.log("String set: " + reply); // OK
});

redisClient.get('framework', function(err, reply) {
  console.log("String get: " + reply); // ReactJS
});

// Hashes

redisClient.hset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');

redisClient.hgetall('frameworks_hash', function(err, object) {
  console.log("Hashes : ");
  console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
});

// Lists

redisClient.rpush(['frameworks_list', 'ReactJS', 'Angular'], function(err, reply) {
  console.log("Lists right push: " + reply); // 2
});

redisClient.lrange('frameworks_list', 0, -1, function(err, reply) {
  console.log("List: " + reply); // [ 'ReactJS', 'Angular' ]
});

// Sets

redisClient.sadd(['frameworks_set', 'ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'], function(err, reply) {
  console.log("Sets: " + reply); // 4
});

redisClient.smembers('frameworks_set', function(err, reply) {
  console.log("Sets members: " + reply); // [ 'Angular', 'ReactJS', 'VueJS', 'Svelte' ]
});

// Check the existence of a key

redisClient.exists('framework', function(err, reply) {
  if (reply === 1) {
    console.log('Exists!');
  } else {
    console.log('Doesn\'t exist!');
  }
});

// Delete a key

redisClient.del('frameworks_list', function(err, reply) {
  console.log("Delete: " + reply); // 1
});

// Increment a key

redisClient.set('working_days', 5, function() {
  redisClient.incr('working_days', function(err, reply) {
    console.log("Increment: " + reply); // 6
  });
});