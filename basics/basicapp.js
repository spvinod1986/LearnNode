const logger = require('./logger'); // the require function will return the exports object from that file
logger.log('Logger Message');

const path = require('path'); // Node built in module for working with paths
var pathObject = path.parse(__filename);
console.log(pathObject); // returns path object with all details.

const os = require('os'); // Node built in module for working with operating system
console.log(`Total memory : ${os.totalmem()}`);
console.log(`Free memory: ${os.freemem()}`);

const fs = require('fs'); // Node built in module for working with file system
console.log(`Sync method result is : ${fs.readdirSync('./')}`); // this is synchronous method which means it blocks thread
fs.readdir('./', function (err, res) { // this is async implementation of same method
    // async methods will have a second variable for call back function.
    // this call back function will be invoked once the operation is complete and results are returned in this.
    if (err)
        console.log('Error', err);
    console.log(`Async method result is : ${res}`);
}); // Always prefer to use async methods

const EventEmitter = require('events'); // the variable is pascal case because it is a class. Node built in module for working with events.
const emitter = new EventEmitter(); // this is for demo purpose. You wont use this object in day to day code.
// register a listener for event.
// The listener should be registered before raising event
emitter.on('messageLogged', function (arg) {
    console.log('Listener Called', arg);
});
emitter.emit('messageLogged', { id: 1, message: 'Event Message' }); // to raise an event

const EventLogger = require('./eventlogger');
const eventLogger = new EventLogger(); // this is how event handling is generally done
// register a listener
eventLogger.on('messageLogged', (arg) => {
    console.log('Listener called from EventLogger', arg);
})
eventLogger.log('EventLog Message');

const http = require('http'); //Node built in module for working with http requests
const server = http.createServer();
server.on('connection', (socket) => {
    console.log('New connection....');
});
//server.listen(3000);
console.log('listening on port 3000...');

// another impl for http
// just for demo. low level implementation. In real world we will use framework like Express.
// Express is built on top of http Module in node
const server1 = http.createServer((req, res) => {
    if (req.url === '/') {
        res.write('Hello World');
        res.end();
    }
    if (req.url === '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});
//server1.listen(3000); // commented to prevent server from running. Uncomment to test this.
console.log('listening on port 3000 again...');

